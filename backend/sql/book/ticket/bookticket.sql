USE prj3;

# 티켓에 들어갈 정보.
CREATE TABLE book_ticket
(
    book_ticket_payment_id         INT REFERENCES payment (id),
    book_ticket_movie_id           INT REFERENCES movie (id),
    book_ticket_book_place_time_id INT REFERENCES book_place_time (book_place_time_id),
    book_ticket_member_number      INT REFERENCES member (number),
    book_ticket_row_cols           VARCHAR(100) NOT NULL,
    book_ticket_price              INT          NOT NULL,
    PRIMARY KEY (book_ticket_payment_id)
);

DROP TABLE book_ticket;

ALTER TABLE book_ticket
    ADD COLUMN is_valid BOOLEAN DEFAULT TRUE;

SELECT *
FROM payment;

DESC payment;

SELECT *
FROM book_ticket;

DESC book_ticket;

SELECT *
FROM book_seat;