use prj3;

CREATE TABLE product
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    name     VARCHAR(100)  NOT NULL,
    content  VARCHAR(2000) NOT NULL,
    price    INT           NOT NULL,
    stock    INT           NOT NULL,
    quantity INT      default 1,
    reg_date DATETIME DEFAULT NOW()
);

alter table product
    add column type int;

CREATE TABLE product_image
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(200) NOT NULL,
    path       VARCHAR(200) NOT NULL,
    product_id INT REFERENCES product (id)
);

alter table product_image
    modify column path varchar(200);



CREATE TABLE product_cart
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(200),
    path       VARCHAR(200),
    fileName   VARCHAR(200),
    product_id INT REFERENCES product (id),
    quantity   INT,
    price      INT,
    reg_date   DATETIME DEFAULT NOW()
);

CREATE TABLE product_comment
(
    id         int primary key auto_increment,
    writer     varchar(20),
    content    varchar(200),
    product_id int references product (id),
    reg_date   datetime default now()
);



SELECT *
FROM product;
SELECT *
FROM product_image;

SELECT *
FROM product p
         join product_image pi
              on p.id = pi.product_id
where p.id = 1;

SELECT *
FROM product_cart;

SELECT *
FROM product_comment
where product_id = 1;

drop table product;
drop table product_image;
drop table product_cart;

select *
from member;

CREATE TABLE product_qna
(
    id         int primary key auto_increment,
    writer     varchar(20),
    title      varchar(200),
    content    varchar(200),
    product_id int references product (id),
    reg_date   datetime default now()
);

create table product_type
(

    id         int auto_increment primary key,
    name       varchar(10),
    product_id int references product (id)
);

select *
from product_qna
where product_id = 1;

SELECT *
FROM product_comment
WHERE product_id = 2;


select count(*)
from product_comment
where product_id = 2;

insert into product_qna(writer, title, content, product_id)
    (select writer, title, content, product_id from product_qna where product_id = 2);

select *
from product_type;

select *
from product;

insert into product_type(name)
values ('세트'),
       ('팝콘'),
       ('간식'),
       ('드링크');

select p.name
from product p
         join product_type pt
              on p.type = pt.id
where pt.id = 3;


SELECT p.id, p.name, p.price, pi.path as path, p.stock, pi.name fileName, p.quantity
FROM product p
         JOIN product_image pi
              ON p.id = pi.product_id
         JOIN product_type pt
              ON pt.id = p.type
WHERE pt.id = 3
ORDER BY p.id DESC;

DESC product;
DESC product_type;

SELECT *
from product;

select *
from product_type;

SELECT COUNT(*)
FROM product p
         join product_type pt
              ON p.type = pt.id
WHERE p.type = '4';