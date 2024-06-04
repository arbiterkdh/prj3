USE prj3;

CREATE TABLE theater
(
    number   INT PRIMARY KEY AUTO_INCREMENT,
    city     VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO theater
    (city, location)
VALUES ('seoul', '강남'),
       ('kyungki', '고양스타필드'),
       ('incheon', '검단'),
       ('daejeon|choongcheong|sejong', '공주'),
       ('boosan|daegu|gyungsang', '경북도청'),
       ('gwangjoo|jeonla', '광주상무'),
       ('gangwon', '남춘천'),
       ('jeju', '제주삼화');

INSERT INTO theater
    (city, location)
VALUES ('seoul', '강동'),
       ('seoul', '군자'),
       ('seoul', '더 부티크 목동현대백화점'),
       ('seoul', '동대문')
;

SELECT *
FROM theater;

DELETE
FROM theater;