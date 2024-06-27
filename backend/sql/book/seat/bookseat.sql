USE prj3;

CREATE TABLE book_seat
(
    book_seat_book_place_time_id INT         NOT NULL REFERENCES book_place_time (book_place_time_id),
    row_col                      VARCHAR(10) NOT NULL,
    PRIMARY KEY (book_seat_book_place_time_id, row_col)
);

DROP TABLE book_seat;

SELECT *
FROM book_place_time bpt
         JOIN theater_box_movie tbm ON bpt.theater_box_movie_id = tbm.id
         JOIN movie m ON tbm.movie_id = m.id
         JOIN theater_box tb ON tbm.theater_box_id = tb.id;

INSERT INTO book_seat
    (book_seat_book_place_time_id, row_col)
VALUES (78, 'A-1');

SELECT *
FROM book_seat;