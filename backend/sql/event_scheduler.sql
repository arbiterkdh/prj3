USE prj3;

show variables like 'event%';

SELECT *
FROM mysql.event
WHERE name = 'create_movie_schedule';

SHOW EVENTS;

DROP FUNCTION IF EXISTS check_time_overlap;
SHOW FUNCTION STATUS;

DROP EVENT IF EXISTS create_movie_schedule;

-- 체크 함수를 생성합니다
DELIMITER //

CREATE FUNCTION check_time_overlap(box_id INT, start_time DATETIME, end_time DATETIME)
    RETURNS BOOLEAN
BEGIN
    DECLARE overlap_count INT;

    -- 겹치는 상영 시간이 있는지 검사합니다
    SELECT COUNT(*)
    INTO overlap_count
    FROM book_place_time
    WHERE theater_box_movie_id IN (SELECT id
                                   FROM theater_box_movie
                                   WHERE theater_box_id = box_id)
      AND NOT (end_time <= start_time OR start_time >= end_time);

    -- 겹치는 상영 시간이 있으면 TRUE를 반환합니다
    IF overlap_count > 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE EVENT create_movie_schedule
    ON SCHEDULE EVERY 1 DAY
        STARTS CURRENT_TIMESTAMP
    DO
    BEGIN
        DECLARE done INT DEFAULT FALSE;
        DECLARE movie_id INT;
        DECLARE theater_box_id INT;
        DECLARE running_time INT;
        DECLARE start_date DATE;
        DECLARE capacity INT;
        DECLARE start_time DATETIME;
        DECLARE end_time DATETIME;
        DECLARE additional_time INT DEFAULT 10;
        -- 추가 시간을 10분으로 설정

        -- 영화 정보를 가져오기 위한 커서를 정의합니다
        DECLARE cur CURSOR FOR
            SELECT m.id, tbm.theater_box_id, m.running_time, m.start_date, tb.capacity
            FROM movie m
                     JOIN theater_box_movie tbm ON m.id = tbm.movie_id
                     JOIN theater_box tb ON tbm.theater_box_id = tb.id
            WHERE m.start_date <= CURDATE() + INTERVAL 3 WEEK;

        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

        OPEN cur;
        read_loop:
        LOOP
            FETCH cur INTO movie_id, theater_box_id, running_time, start_date, capacity;
            IF done THEN
                LEAVE read_loop;
            END IF;

            -- 러닝타임을 반올림하여 설정합니다
            SET running_time = CEIL(running_time / 10) * 10;

            -- 개봉일을 기준으로 시작 시간을 설정합니다
            SET start_time = CAST(CONCAT(start_date, ' 08:00:00') AS DATETIME);

            -- 개봉일부터 3주 동안의 상영 기간을 생성합니다
            WHILE start_time < DATE_ADD(start_date, INTERVAL 3 WEEK)
                DO
                    -- 종료 시간을 계산합니다
                    SET end_time = DATE_ADD(start_time, INTERVAL (running_time + additional_time) MINUTE);

                    -- 상영 시간이 겹치지 않는지 확인합니다
                    IF NOT check_time_overlap(theater_box_id, start_time, end_time) THEN
                        -- 테이블이 생성되지 않은 경우에만 새로운 상영 시간을 추가합니다
                        INSERT INTO book_place_time (theater_box_movie_id, start_time, end_time, vacancy)
                        VALUES ((SELECT id
                                 FROM theater_box_movie
                                 WHERE theater_box_id = theater_box_id
                                   AND movie_id = movie_id),
                                start_time,
                                end_time,
                                capacity);
                    END IF;

                    -- 다음 상영 시간을 시작합니다 (10분의 휴식 시간을 추가합니다)
                    SET start_time = DATE_ADD(end_time, INTERVAL 10 MINUTE);
                END WHILE;
        END LOOP;

        CLOSE cur;
    END //

DELIMITER ;
