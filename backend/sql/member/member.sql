USE prj3;

CREATE TABLE member
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    email    VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    inserted DATETIME     NOT NULL DEFAULT NOW()
);

SELECT *
FROM member;

DELETE
FROM member;