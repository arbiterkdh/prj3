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
ALTER TABLE promo
    ADD COLUMN isRecommended BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE promo
    ADD COLUMN isApplyButtonVisible BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE promo
    DROP COLUMN isRecommended,
    DROP COLUMN isApplyButtonVisible;


CREATE TABLE promo_file
(
    promo_id INT          NOT NULL REFERENCES promo (id),
    name     VARCHAR(500) NOT NULL,
    PRIMARY KEY (promo_id, name)
);

CREATE TABLE promotion_result
(
    id                INT AUTO_INCREMENT PRIMARY KEY,
    promotion_id      INT  NOT NULL,
    announcement_date DATE NOT NULL,
    winners           TEXT NOT NULL,
    CONSTRAINT fk_promotion_id FOREIGN KEY (promotion_id) REFERENCES promo (id)
);

DESC promo;
DESC promo_file;
DESC promotion_result;

SELECT *
FROM promo;
SELECT *
FROM promo_file;
SELECT *
FROM promotion_result;

INSERT INTO promo
    (title, eventType, eventStartDate, eventEndDate, content)
SELECT title,
       eventType,
       eventStartDate,
       eventEndDate,
       content
FROM promo;

SELECT *
FROM promotion_result
WHERE promotion_result.promotion_id = 132;

UPDATE promotion_result
SET promotion_id      = 132,
    announcement_date = '2024-06-28',
    winners           = '[{"email":"123@123","name":"123"}]'
WHERE id = 132;
