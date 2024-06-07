USE prj3;

CREATE TABLE mail
(
    verify_number INT NOT NULL UNIQUE
);

DROP TABLE mail;

SELECT *
FROM mail;