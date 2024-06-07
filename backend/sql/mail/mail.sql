USE prj3;

CREATE TABLE mail
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    address       VARCHAR(100) NOT NULL UNIQUE,
    verify_number INT          NOT NULL
);

DROP TABLE mail;