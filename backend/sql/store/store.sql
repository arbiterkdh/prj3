use prj3;

CREATE TABLE product_image
(
    product_id INT          NOT NULL REFERENCES product (id),
    name       VARCHAR(200) NOT NULL,
    PRIMARY KEY (product_id, name)
);

Select *
from product;

select *
from product_image;

select *
from product_cart;


SELECT p.id, p.name, p.price, p.stock, pi.name fileName, p.quantity
FROM product p
         JOIN product_image pi
              ON p.id = pi.product_id;


CREATE TABLE product
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    name     VARCHAR(100)  NOT NULL,
    content  VARCHAR(2000) NOT NULL,
    price    INT           NOT NULL,
    stock    INT           NOT NULL,
    type     INT,
    quantity INT      default 1,
    reg_date DATETIME DEFAULT NOW()
);



CREATE TABLE product_cart
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(200),
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

drop table product;
drop table product_image;
drop table product_cart;
drop table product_comment;
drop table product_qna;
drop table product_type;

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

    id   int auto_increment primary key,
    name varchar(10)
);

insert into product_type(name)
values ('세트'),
       ('팝콘'),
       ('간식'),
       ('드링크');

show tables;