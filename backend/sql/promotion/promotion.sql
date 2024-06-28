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
    CONSTRAINT fk_promotion_id
        FOREIGN KEY (promotion_id) REFERENCES promo (id) ON DELETE CASCADE
);

CREATE TABLE promo_winner
(
    id              INT PRIMARY KEY AUTO_INCREMENT,
    promo_result_id INT,
    member_id       INT,
    FOREIGN KEY (promo_result_id) REFERENCES promo_result (id),
    FOREIGN KEY (member_id) REFERENCES member (number)
);

DROP TABLE IF EXISTS promo_winner;
DROP TABLE IF EXISTS promo_result;
DROP TABLE IF EXISTS user_promo_application;

DESC promo;
DESC promo_file;
DESC promo_result;
DESC promo_winner;

SELECT *
FROM promo;
SELECT *
FROM promo_file;
SELECT *
FROM promo_result;
SELECT *
FROM promo_winner;

DELETE
FROM promo
WHERE id BETWEEN 1 AND 136;

INSERT INTO promo
    (title, eventType, eventStartDate, eventEndDate, content)
SELECT title,
       eventType,
       eventStartDate,
       eventEndDate,
       content
FROM promo;

SELECT *
FROM promo_result
WHERE promo_result.promotion_id = 132;

-- 기존 외래 키 삭제
ALTER TABLE promo_winner
    DROP FOREIGN KEY promo_winner_ibfk_1;

ALTER TABLE promo_result
    DROP FOREIGN KEY fk_promotion_id;

-- 새로운 외래 키 추가 (ON DELETE CASCADE)
ALTER TABLE promo_winner
    ADD CONSTRAINT promo_winner_ibfk_1
        FOREIGN KEY (promo_result_id) REFERENCES promo_result (id) ON DELETE CASCADE,
    ADD CONSTRAINT promo_winner_member_fk
        FOREIGN KEY (member_id) REFERENCES member (number);

ALTER TABLE promo_result
    ADD CONSTRAINT fk_promotion_id
        FOREIGN KEY (promotion_id) REFERENCES promo (id) ON DELETE CASCADE;