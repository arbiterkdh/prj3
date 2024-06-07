USE prj3;

CREATE TABLE mail
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    verify_number INT      NOT NULL,
    created       DATETIME NOT NULL DEFAULT NOW(),
    expires       DATETIME NOT NULL DEFAULT NOW() + 1800
);

