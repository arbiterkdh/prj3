use prj3;

CREATE TABLE movie
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    title        VARCHAR(50)   NOT NULL,
    content      VARCHAR(1000) NOT NULL,
    genre        VARCHAR(50)   NOT NULL,
    running_time INT           NOT NULL,
    rating       INT           NOT NULL,
    start_date   DATE          NOT NULL,
    director     VARCHAR(50)   NOT NULL,
    actors       VARCHAR(50)   NOT NULL
);

CREATE TABLE movie_file
(
    movie_id INT          NOT NULL REFERENCES movie (id),
    name     VARCHAR(500) NOT NULL,
    PRIMARY KEY (movie_id, name)
);

CREATE TABLE movie_type
(
    movie_id INT         NOT NULL REFERENCES movie (id),
    name     VARCHAR(20) NOT NULL,
    PRIMARY KEY (movie_id, name)
);

SELECT *
FROM movie;
SELECT *
FROM movie_type;



