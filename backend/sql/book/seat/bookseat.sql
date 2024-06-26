USE prj3;

CREATE TABLE book_seat
(
    book_seat_id                 INT PRIMARY KEY AUTO_INCREMENT,
    book_seat_book_place_time_id INT        NOT NULL REFERENCES book_place_time (book_place_time_id),
    row                          VARCHAR(4) NOT NULL,
    col                          INT        NOT NULL
);