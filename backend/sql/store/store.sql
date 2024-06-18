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

select *
from member;


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
    id            INT PRIMARY KEY AUTO_INCREMENT,
    name          VARCHAR(200),
    fileName      VARCHAR(200),
    product_id    INT REFERENCES product (id),
    quantity      INT,
    price         INT,
    member_number INT REFERENCES member (number),
    reg_date      DATETIME DEFAULT NOW(),
    payment_id    INT REFERENCES payment (id)
);

drop table product_cart;

select *
from product_cart;

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

CREATE TABLE product_cart_order
(

    id            INT PRIMARY KEY AUTO_INCREMENT,
    cart_id       INT REFERENCES product_cart (id),
    member_number INT REFERENCES member (number),
    payment_id    INT REFERENCES payment (id),
    reg_date      DATETIME DEFAULT NOW()
);
drop table product_cart_order;

CREATE TABLE payment
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    order_number  VARCHAR(50),
    status        VARCHAR(10),
    amount        INT,
    buyer_name    VARCHAR(50),
    buyer_email   VARCHAR(100),
    buyer_date    DATETIME DEFAULT NOW(),
    success       BOOLEAN,
    member_number INT REFERENCES member (number)
);

drop table payment;

select *
from payment;

select *
from product_cart;

select *
from member;

drop table payment;

select product_id
from payment p
         join product_cart pc
              on p.member_number = pc.member_number;

SELECT pc.payment_id, p.id
FROM product_cart pc
         JOIN payment p
              on pc.member_number = p.member_number;

UPDATE product_cart
SET payment_id = 1
WHERE id = 10;

CREATE TABLE product_order
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    payment_id INT REFERENCES payment (id),
    reg_date   DATETIME DEFAULT NOW()
);