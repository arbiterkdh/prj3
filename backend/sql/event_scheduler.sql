USE prj3;

SET GLOBAL event_scheduler = OFF;

SHOW VARIABLES LIKE 'event%';

SELECT *
FROM mysql.event
WHERE name = 'create_movie_schedule';

SHOW EVENTS;

SELECT *
FROM book_place_time
ORDER BY start_time;

SELECT *
FROM book_place_time bpt
         JOIN theater_box_movie tbm ON bpt.theater_box_movie_id = tbm.id
WHERE tbm.theater_box_id = 4;

SELECT *
FROM theater_box_movie;

DELETE
FROM book_place_time;

DROP EVENT IF EXISTS create_movie_schedule;

DELIMITER //

CREATE EVENT create_movie_schedule
    ON SCHEDULE EVERY 1 DAY
        STARTS NOW()
    DO
    BEGIN
        DECLARE done INT DEFAULT FALSE;
        DECLARE movieId INT;
        DECLARE boxMovieId INT;
        DECLARE theaterBoxId INT;
        DECLARE runningTime INT;
        DECLARE startDate DATE;
        DECLARE capacity INT;
        DECLARE startTime DATETIME;
        DECLARE endTime DATETIME;
        DECLARE additionalTime INT DEFAULT 10;
        -- 추가 시간을 10분으로 설정


        -- 영화 목록 커서를 엽니다
        DECLARE movieCursor CURSOR FOR
            SELECT m.id, tbm.id, tbm.theater_box_id, m.running_time, m.start_date, tb.capacity
            FROM movie m
                     JOIN theater_box_movie tbm ON m.id = tbm.movie_id
                     JOIN theater_box tb ON tbm.theater_box_id = tb.id
            WHERE m.start_date <= CURDATE() + INTERVAL 3 WEEK
              AND m.start_date >= CURDATE() - INTERVAL 3 WEEK;

        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

        -- theaterBoxId를 그룹으로 묶기 위해 임시 테이블을 사용하지 않고 직접 처리
        TRUNCATE TABLE book_place_time;

        OPEN movieCursor;
        read_loop:
        LOOP
            FETCH movieCursor INTO movieId, boxMovieId, theaterBoxId, runningTime, startDate, capacity;
            IF done THEN
                LEAVE read_loop;
            END IF;

            -- 상영 시작 시간을 영화의 개봉일로 설정합니다 (DATETIME 형식으로 변환)
            SET startTime = CAST(startDate AS DATETIME) + INTERVAL 8 HOUR;
            -- 아침 8시부터 생성합니다

            -- 상영 기간 동안 상영 시간을 반복적으로 생성합니다 (개봉일로부터 3주)
            WHILE startTime < startDate + INTERVAL 3 WEEK
                DO
                    -- 러닝타임을 반올림합니다
                    SET runningTime = CEIL(runningTime / 10.0) * 10;

                    -- 종료 시간을 계산합니다
                    SET endTime = startTime + INTERVAL (runningTime + additionalTime) MINUTE;

                    -- 밤 11시 이전까지만 생성합니다
                    IF TIME(startTime) < '23:00:00' THEN
                        -- 시간대가 겹치는지 확인합니다
                        IF NOT EXISTS (SELECT 1
                                       FROM book_place_time bpt
                                                JOIN theater_box_movie tbm ON bpt.theater_box_movie_id = tbm.id
                                       WHERE tbm.theater_box_id = theaterBoxId
                                         AND ((bpt.start_time <= startTime AND bpt.end_time > startTime) OR
                                              (bpt.start_time < endTime AND bpt.end_time >= endTime) OR
                                              (bpt.start_time >= startTime AND bpt.end_time <= endTime))) THEN
                            -- 상영 시간을 추가합니다
                            INSERT INTO book_place_time (theater_box_movie_id, start_time, end_time, vacancy)
                            VALUES (boxMovieId, startTime, endTime, capacity);
                        END IF;
                    END IF;

                    -- 다음 상영 시간을 시작합니다 (startTime에 10분의 휴식 시간을 더합니다)
                    SET startTime = endTime + INTERVAL 10 MINUTE;

                    -- 만약 다음 상영 시간이 23시 이후거나 새벽시간이 되면 다음 날 아침 8시로 설정합니다
                    IF TIME(startTime) >= '23:00:00' OR TIME(startTime) < '08:00:00' THEN
                        SET startTime = DATE_ADD(DATE(startTime), INTERVAL 1 DAY) + INTERVAL 8 HOUR;
                    END IF;
                END WHILE;
        END LOOP;

        CLOSE movieCursor;
    END //

DELIMITER ;
