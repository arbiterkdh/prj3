USE prj3;

CREATE TABLE theater
(
    number   INT PRIMARY KEY AUTO_INCREMENT,
    city     VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL UNIQUE
);

DESC theater;

INSERT INTO theater
    (city, location)
VALUES ('서울', '강남'),
       ('경기', '고양스타필드'),
       ('인천', '검단'),
       ('대전,충청,세종', '공주'),
       ('부산,대구,경상', '경북도청'),
       ('광주,전라', '광주상무'),
       ('강원', '남춘천'),
       ('제주', '제주삼화');

INSERT INTO theater
    (city, location)
VALUES ('서울', '강동'),
       ('서울', '군자'),
       ('서울', '더 부티크 목동현대백화점'),
       ('서울', '동대문')
;

SELECT *
FROM theater;

DELETE
FROM theater
WHERE number = 143;

CREATE TABLE theater_box
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    box_number     INT NOT NULL,
    theater_number INT REFERENCES theater (number),
    capacity       INT NOT NULL DEFAULT 176
);
ALTER TABLE theater_box
    MODIFY COLUMN capacity INT NOT NULL DEFAULT 186;

UPDATE theater_box
SET capacity = 186;

SELECT *
FROM theater_box;

DROP TABLE theater_box;

CREATE TABLE theater_box_movie
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    movie_id       INT REFERENCES movie (id),
    theater_box_id INT REFERENCES theater_box (id),
    time_interval  INT NOT NULL
);

ALTER TABLE theater_box_movie
    DROP COLUMN time_interval;

DROP TABLE theater_box_movie;

SELECT *
FROM movie;

SELECT *
FROM theater;

INSERT INTO theater_box
    (box_number, theater_number)
VALUES (1, 112);

INSERT INTO theater_box
    (box_number, theater_number)
VALUES (2, 112);

INSERT INTO theater_box
    (box_number, theater_number)
VALUES (3, 112);

INSERT INTO theater_box
    (box_number, theater_number)
VALUES (1, 120);

SELECT *
FROM theater_box;

INSERT INTO theater_box_movie
    (movie_id, theater_box_id, time_interval)
VALUES (519, (SELECT id FROM theater_box WHERE theater_number = 112 AND box_number = 1),
        (SELECT running_time FROM movie WHERE id = 519) / 10 * 10 + 30);

INSERT INTO theater_box_movie
    (movie_id, theater_box_id, time_interval)
VALUES (520, (SELECT id FROM theater_box WHERE theater_number = 112 AND box_number = 2),
        (SELECT running_time FROM movie WHERE id = 520) / 10 * 10 + 30);

INSERT INTO theater_box_movie
    (movie_id, theater_box_id, time_interval)
VALUES (521, (SELECT id FROM theater_box WHERE theater_number = 112 AND box_number = 3),
        (SELECT running_time FROM movie WHERE id = 521) / 10 * 10 + 30);

INSERT INTO theater_box_movie
    (movie_id, theater_box_id, time_interval)
VALUES (522, (SELECT id FROM theater_box WHERE theater_number = 112 AND box_number = 1),
        (SELECT running_time FROM movie WHERE id = 522) / 10 * 10 + 30);

INSERT INTO theater_box_movie
    (movie_id, theater_box_id, time_interval)
VALUES (520, (SELECT id FROM theater_box WHERE theater_number = 120 AND box_number = 1),
        (SELECT running_time FROM movie WHERE id = 520) / 10 * 10 + 30);

INSERT INTO theater_box_movie
    (movie_id, theater_box_id, time_interval)
VALUES (521, (SELECT id FROM theater_box WHERE theater_number = 120 AND box_number = 1),
        (SELECT running_time FROM movie WHERE id = 521) / 10 * 10 + 30);


SELECT *
FROM movie_location
ORDER BY theater_number, movie_id;

SELECT *
FROM theater_box_movie;

SELECT ml.theater_number, ml.movie_id, m.title
FROM movie_location ml
         JOIN movie m ON ml.movie_id = m.id
WHERE ml.theater_number = 120
  AND m.start_date < CURRENT_DATE()
  AND DATE_ADD(m.start_date, INTERVAL 3 WEEK) >= CURRENT_DATE();

SELECT tb.box_number, m.title, m.id, tbm.id
FROM theater_box_movie tbm
         JOIN movie m ON tbm.movie_id = m.id
         JOIN theater_box tb ON tbm.theater_box_id = tb.id
WHERE tb.id = 1
ORDER BY tb.box_number, m.id;

SELECT *
FROM movie;