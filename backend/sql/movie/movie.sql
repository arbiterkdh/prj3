use prj3;

CREATE TABLE movie
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    title        VARCHAR(50)   NOT NULL,
    content      VARCHAR(1000) NOT NULL,
    genre        VARCHAR(50)   NOT NULL,
    running_time INT           NOT NULL,
    rating       VARCHAR(20)   NOT NULL,
    start_date   DATE          NOT NULL,
    director     VARCHAR(50)   NOT NULL,
    actors       VARCHAR(50)   NOT NULL
);

ALTER TABLE movie
    MODIFY rating VARCHAR(20) NOT NULL;

ALTER TABLE movie
    MODIFY director VARCHAR(100) NOT NULL;
ALTER TABLE movie
    MODIFY actors VARCHAR(100) NOT NULL;

DESC movie;

SELECT *
FROM movie;

CREATE TABLE movie_file
(
    movie_id INT          NOT NULL REFERENCES movie (id),
    name     VARCHAR(500) NOT NULL,
    PRIMARY KEY (movie_id, name)
);


CREATE TABLE movie_type
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT         NOT NULL REFERENCES movie (id),
    name     VARCHAR(20) NOT NULL
);

SELECT *
FROM movie;
SELECT *
FROM movie_type;
SELECT *
FROM movie_file;

DESCRIBE movie_type;
ALTER TABLE movie_type
    DROP PRIMARY KEY;

DROP TABLE movie_type;

# 댓글 테이블
CREATE TABLE movie_comment
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    movie_id  INT          NOT NULL REFERENCES movie (id),
    member_id INT          NOT NULL REFERENCES member (number),
    comment   VARCHAR(500) NOT NULL,
    inserted  DATETIME     NOT NULL DEFAULT NOW()
);

DELETE
FROM member
WHERE number = 6;

SELECT *
FROM member;
DESC member;

SELECT *
FROM movie_comment;

DESC movie_comment;

INSERT INTO movie_comment
    (movie_id, member_id, comment)
SELECT movie_id, member_id, comment
FROM movie_comment;

SELECT *
FROM movie_comment;

INSERT INTO movie
(title, content, genre, running_time, rating, start_date, director, actors)
SELECT title,
       content,
       genre,
       running_time,
       rating,
       start_Date,
       director,
       actors
FROM movie;

SELECT COUNT(*)
FROM movie
WHERE DATEDIFF(start_date, '2024-06-12') <= 0
ORDER BY id DESC;

SELECT *
FROM movie
WHERE title LIKE '%소닉%';

SELECT *
FROM movie
WHERE DATEDIFF(start_date, '2024-06-12') <= 0;


DESC movie_location;

DELETE
FROM movie_location;

DESC movie_file;

SELECT *
FROM movie_file;

CREATE TABLE movie_like
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    movie_id  INT NOT NULL REFERENCES movie (id),
    member_id INT NOT NULL REFERENCES member (number)
);
