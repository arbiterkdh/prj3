USE prj3;

show variables like 'event%';

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
        DECLARE movie_id INT;
        DECLARE box_movie_id INT;
        DECLARE theater_box_id INT;
        DECLARE running_time INT;
        DECLARE start_date DATE;
        DECLARE capacity INT;
        DECLARE start_time DATETIME;
        DECLARE end_time DATETIME;
        DECLARE additional_time INT DEFAULT 10;
        -- 추가 시간을 10분으로 설정

        -- 현재 상영 중인 영화를 추적하는 변수
        DECLARE current_movie_id INT DEFAULT NULL;
        DECLARE current_end_time DATETIME;

        -- 각 상영관에서 상영될 영화 순서를 관리하는 변수
        DECLARE movie_sequence INT DEFAULT 0;

        DECLARE cur CURSOR FOR
            SELECT m.id, tbm.id, tbm.theater_box_id, m.running_time, m.start_date, tb.capacity
            FROM movie m
                     JOIN theater_box_movie tbm ON m.id = tbm.movie_id
                     JOIN theater_box tb ON tbm.theater_box_id = tb.id
            WHERE m.start_date <= CURDATE() + INTERVAL 3 WEEK
              AND m.start_date >= CURDATE() - INTERVAL 3 WEEK;

        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

        OPEN cur;
        read_loop:
        LOOP
            FETCH cur INTO movie_id, box_movie_id, theater_box_id, running_time, start_date, capacity;
            IF done THEN
                LEAVE read_loop;
            END IF;

            -- 러닝타임을 반올림합니다
            SET running_time = CEIL(running_time / 10.0) * 10;

            -- 상영 시작 시간을 영화의 개봉일로 설정합니다 (DATETIME 형식으로 변환)
            SET start_time = CAST(start_date AS DATETIME) + INTERVAL 8 HOUR;
            -- 아침 8시부터 생성합니다

            -- 현재 상영 중인 영화 선택
            SELECT movie_id
            INTO current_movie_id
            FROM theater_box_movie
            WHERE theater_box_id = theater_box_id
              AND movie_sequence = 1;

            -- 다음 상영 영화 선택 및 상영 시간 생성 로직
            IF current_movie_id IS NULL OR current_end_time IS NULL OR end_time > current_end_time THEN
                -- 현재 상영 중인 영화가 없거나, 종료 시간이 지났을 때 다음 영화 선택
                SELECT movie_id
                INTO current_movie_id
                FROM theater_box_movie
                WHERE theater_box_id = theater_box_id
                  AND movie_sequence = movie_sequence + 1;

                -- 영화 순서가 마지막이라면 처음 영화로 순환
                IF current_movie_id IS NULL THEN
                    SELECT movie_id
                    INTO current_movie_id
                    FROM theater_box_movie
                    WHERE theater_box_id = theater_box_id
                      AND movie_sequence = 1;
                END IF;

                -- 다음 상영 시간 계산
                SET current_end_time = start_time + INTERVAL (running_time + additional_time) MINUTE;

                -- 상영 영화 순서 업데이트
                UPDATE theater_box_movie
                SET movie_sequence = movie_sequence + 1
                WHERE theater_box_id = theater_box_id
                  AND movie_sequence = 1;
            ELSE
                -- 현재 상영 중인 영화의 종료 시간까지 기다립니다
                SET current_end_time = current_end_time + INTERVAL (running_time + additional_time) MINUTE;
            END IF;

            -- 밤 11시 이전까지만 생성합니다
            IF TIME(start_time) < '23:00:00' THEN
                -- 시간대가 겹치는지 확인합니다
                IF NOT EXISTS (SELECT 1
                               FROM book_place_time bpt
                                        JOIN theater_box_movie tbm ON bpt.theater_box_movie_id = tbm.id
                               WHERE tbm.theater_box_id = theater_box_id
                                 AND ((bpt.start_time <= start_time AND bpt.end_time > start_time) OR
                                      (bpt.start_time < end_time AND bpt.end_time >= end_time) OR
                                      (bpt.start_time >= start_time AND bpt.end_time <= end_time))) THEN
                    -- 상영 시간을 추가합니다
                    INSERT INTO book_place_time (theater_box_movie_id, start_time, end_time, vacancy)
                    VALUES (box_movie_id, start_time, end_time, capacity);
                END IF;
            END IF;

            -- 다음 상영 시간을 시작합니다 (start_time에 10분의 휴식 시간을 더합니다)
            SET start_time = end_time + INTERVAL 10 MINUTE;

            -- 만약 다음 상영 시간이 23시 이후거나 새벽시간이 되면 다음 날 아침 8시로 설정합니다
            IF TIME(start_time) >= '23:00:00' OR TIME(start_time) < '08:00:00' THEN
                SET start_time = DATE_ADD(DATE(start_time), INTERVAL 1 DAY) + INTERVAL 8 HOUR;
            END IF;
        END LOOP;

        CLOSE cur;
    END //

DELIMITER ;
