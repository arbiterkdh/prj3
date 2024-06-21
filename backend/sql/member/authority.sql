USE prj3;

CREATE TABLE authority
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT         NOT NULL REFERENCES member (number),
    name      VARCHAR(20) NOT NULL
);

SELECT *
FROM authority;

SELECT *
FROM member;

INSERT INTO authority (member_id, name)
VALUES (15, 'admin');