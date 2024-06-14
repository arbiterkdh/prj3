USE prj3;

CREATE TABLE movie_location
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    movie_id       INT REFERENCES movie (id),
    theater_number INT REFERENCES theater (number)
);

SELECT *
FROM movie_location;

SELECT id
FROM movie;

SELECT m.id, ml.theater_number, m.title
FROM movie_location ml
         JOIN movie m ON ml.movie_id = m.id
WHERE ml.theater_number = 129;

SELECT id, title, running_time, rating, start_date
FROM movie
WHERE DATE_ADD(start_date, INTERVAL 1 MONTH) >= NOW()
  AND start_date <= NOW();

SELECT id, title, running_time, rating, start_date
FROM movie
WHERE DATE_SUB(start_date, INTERVAL 1 MONTH ) <= NOW()
  AND start_date > NOW();


CREATE TABLE book_movie_state
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT REFERENCES movie(id),
    running_time INT NOT NULL ,
    movie_start_date DATE NOT NULL ,
    book_start_date DATE NOT NULL ,
    book_end_date DATE NOT NULL
);

SELECT *
FROM book_movie_state;

SELECT *
FROM movie;

DESC movie;

INSERT INTO book_movie_state (movie_id, running_time, movie_start_date, book_start_date, book_end_date)
VALUES (519, 120, '2024-06-05', DATE_SUB('2024-06-05', INTERVAL 10 DAY ), DATE_ADD('2024-06-05', INTERVAL 30 DAY ));

DROP TABLE book_movie_state;



SHOW VARIABLES LIKE 'event%';

SET GLOBAL event_scheduler = ON;

SELECT *
FROM information_schema.events;

DROP on_screen_list_check;

CREATE EVENT on_screen_list_check
    ON SCHEDULE EVERY 1 DAY
-- STARTS '2024-06-13 00:00:00'
    COMMENT '영화별 개봉일과 현재일 비교해서 상영 가능한 것은 onscreenlist 에 등록'
    DO
SELECT
