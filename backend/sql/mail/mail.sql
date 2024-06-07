USE prj3;

CREATE TABLE mail
(
    address       VARCHAR(100) NOT NULL UNIQUE,
    verify_number INT          NOT NULL UNIQUE
);

DROP TABLE mail;

SELECT *
FROM mail;