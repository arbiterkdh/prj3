USE prj3;

CREATE TABLE expire_time
(
    mail_id INT      NOT NULL REFERENCES mail (id),
    expires DATETIME NOT NULL,
    PRIMARY KEY (mail_id, expires)
);

DROP TABLE expire_time;