USE prj3;

CREATE TABLE book_seat
(
    book_seat_book_place_time_id INT         NOT NULL REFERENCES book_place_time (book_place_time_id),
    row_col                      VARCHAR(10) NOT NULL,
    book_seat_member_number      INT REFERENCES member (number),
    is_paying                    BOOLEAN              DEFAULT FALSE,
    is_paid                      BOOLEAN              DEFAULT FALSE,
    selected_time                DATETIME    NOT NULL DEFAULT NOW(),
    PRIMARY KEY (book_seat_book_place_time_id, row_col)
);

DROP TABLE book_seat;

SELECT *
FROM book_place_time
WHERE book_place_time_id = 85;

DELETE
FROM book_seat
WHERE is_paying = FALSE
  AND DATE_ADD(selected_time, INTERVAL 10 MINUTE) < NOW();

SELECT *
FROM book_place_time bpt
         JOIN theater_box_movie tbm ON bpt.theater_box_movie_id = tbm.id
         JOIN movie m ON tbm.movie_id = m.id
         JOIN theater_box tb ON tbm.theater_box_id = tb.id;

INSERT INTO book_seat
    (book_seat_book_place_time_id, row_col)
VALUES (85, 'A-5');

SELECT *
FROM book_seat;

UPDATE book_place_time
SET vacancy = 186;