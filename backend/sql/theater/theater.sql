USE prj3;

CREATE TABLE theater
(
    number   INT PRIMARY KEY AUTO_INCREMENT,
    city     VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO theater
    (city, location)
VALUES ('서울', '강남');

SELECT *
FROM theater;