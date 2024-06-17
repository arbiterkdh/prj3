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
    box_number     INT NOT NULL UNIQUE,
    theater_number INT REFERENCES theater (number)
);

SELECT *
FROM theater_box;

DROP TABLE theater_box;

CREATE TABLE theater_box_time_table
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    movie_id      INT REFERENCES movie (id),
    box_number    INT REFERENCES theater_box (box_number),
    time_interval INT NOT NULL
);