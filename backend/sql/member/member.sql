USE prj3;

DROP TABLE member;

CREATE TABLE member
(
    number    INT PRIMARY KEY AUTO_INCREMENT,
    email     VARCHAR(50)  NOT NULL UNIQUE,
    password  VARCHAR(500) NOT NULL,
    nick_name VARCHAR(20)  NOT NULL UNIQUE,
    inserted  DATETIME     NOT NULL DEFAULT NOW()
);

SELECT *
FROM member;

DELETE
FROM member;

DROP TABLE member;