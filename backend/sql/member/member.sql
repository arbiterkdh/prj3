USE prj3;

DROP TABLE member;

CREATE TABLE member
(
    number    INT PRIMARY KEY AUTO_INCREMENT,
    id        VARCHAR(30)  NOT NULL UNIQUE,
    email     VARCHAR(100) NOT NULL UNIQUE,
    password  VARCHAR(300) NOT NULL,
    nick_name VARCHAR(100) NOT NULL UNIQUE,
    inserted  DATETIME     NOT NULL DEFAULT NOW()
);

SELECT *
FROM member;

DELETE
FROM member;