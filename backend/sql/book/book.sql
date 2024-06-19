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
WHERE DATE_SUB(start_date, INTERVAL 1 MONTH) <= NOW()
  AND start_date > NOW();

CREATE TABLE book_place_time
(
    id                   INT PRIMARY KEY AUTO_INCREMENT,
    theater_box_movie_id INT REFERENCES theater_box_movie (id),
    vacancy              INT  NOT NULL DEFAULT 176,
    date                 DATE NOT NULL,
    time                 TIME NOT NULL
);

DROP TABLE book_place_time;

SELECT *
FROM book_place_time;