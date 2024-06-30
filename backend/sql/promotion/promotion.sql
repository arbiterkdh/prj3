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
    promo_id INT NOT NULL REFERENCES promo(id),
    file_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(500) NOT NULL,
    PRIMARY KEY (promo_id, file_type, file_name)
);
CREATE TABLE promotion_result
(
    id                INT AUTO_INCREMENT PRIMARY KEY,
    promotion_id      INT  NOT NULL,
    announcement_date DATE NOT NULL,
    winners           TEXT NOT NULL,
    CONSTRAINT fk_promotion_id
        FOREIGN KEY (promotion_id) REFERENCES promo (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS promo;
DROP TABLE IF EXISTS promo_file;
DROP TABLE IF EXISTS promo_result;

DESC promo;
DESC promo_file;
DESC promo_result;

SELECT *
FROM promo;
SELECT *
FROM promo_file;
SELECT *
FROM promo_result;

INSERT INTO promo
    (title, eventType, eventStartDate, eventEndDate, content)
SELECT title,
       eventType,
       eventStartDate,
       eventEndDate,
       content
FROM promo;