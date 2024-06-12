USE prj3;

CREATE TABLE promo
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    title          VARCHAR(100)  NOT NULL,
    eventType      VARCHAR(50)   NOT NULL,
    eventStartDate DATE          NOT NULL,
    eventEndDate   DATE          NOT NULL,
    content        VARCHAR(1000) NOT NULL
);
DROP TABLE promo;
DESC promo;

SELECT *
FROM promo;

CREATE TABLE promo_file
(
    promo_id INT          NOT NULL REFERENCES promo (id),
    name     VARCHAR(500) NOT NULL,
    PRIMARY KEY (promo_id, name)
);

SELECT *
FROM promo_file;