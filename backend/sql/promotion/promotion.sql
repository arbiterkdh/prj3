USE prj3;

CREATE TABLE promo
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    title          VARCHAR(100)  NOT NULL,
    eventType      VARCHAR(50)   NOT NULL,
    eventStartDate DATE          NOT NULL,
    eventEndDate   DATE          NOT NULL,
    content        VARCHAR(1000) NULL
);

CREATE TABLE promo_file
(
    promo_id INT          NOT NULL REFERENCES promo (id),
    name     VARCHAR(500) NOT NULL,
    PRIMARY KEY (promo_id, name)
);

DESC promo;
DESC promo_file;

SELECT *
FROM promo;

SELECT *
FROM promo_file;

SELECT * FROM promo_file WHERE promo_id = 29;

DROP TABLE IF EXISTS promo_file;
DROP TABLE IF EXISTS promo;

INSERT INTO promo
(title, eventType, eventStartDate, eventEndDate, content)
SELECT title,
       eventType,
       eventStartDate,
       eventEndDate,
       content
FROM promo;

ALTER TABLE promo ADD COLUMN isRecommended BOOLEAN DEFAULT FALSE;
