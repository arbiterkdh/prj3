USE prj3;

SHOW VARIABLES LIKE 'event%';

SET GLOBAL event_scheduler = ON;

SELECT *
FROM information_schema.events;

DROP on_screen_list_check;

CREATE EVENT on_screen_list_check
    ON SCHEDULE EVERY 1 DAY
-- STARTS '2024-06-16 00:00:00'
    COMMENT '영화별 개봉일과 현재일 비교해서 상영 가능한 것은 onscreenlist 에 등록'
    DO
    SELECT