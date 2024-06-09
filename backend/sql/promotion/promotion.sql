USE prj3;

CREATE TABLE promo
(
    id      INT PRIMARY KEY AUTO_INCREMENT,
    title    VARCHAR(100)  NOT NULL,
    eventType VARCHAR(50) NOT NULL,
    eventStartDate DATE NOT NULL,
    eventEndDate DATE NOT NULL,
    content VARCHAR(1000) NOT NULL
);
DROP TABLE promo;
DESC promo;