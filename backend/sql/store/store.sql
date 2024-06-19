use prj3;

CREATE TABLE product_image
(
    product_id INT          NOT NULL REFERENCES product (id),
    name       VARCHAR(200) NOT NULL,
    PRIMARY KEY (product_id, name)
);

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
    total_price   INT,
    member_number INT REFERENCES member (number),
    reg_date      DATETIME DEFAULT NOW()
);


CREATE TABLE product_comment
(
    id         int primary key auto_increment,
    writer     varchar(20),
    content    varchar(200),
    product_id int references product (id),
    reg_date   datetime default now()
);

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

CREATE TABLE product_order
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    payment_id    INT REFERENCES payment (id),
    name          VARCHAR(50),
    file_name     VARCHAR(100),
    product_id    INT,
    quantity      INT,
    price         INT,
    reg_date      DATETIME,
    member_number INT,
    total_price   INT,
    order_date    DATETIME DEFAULT NOW()
);

drop table payment;
drop table product_cart;
drop table product_order;

select *
from product;

SELECT *
FROM product_cart;

select *
from product_order
order by id desc;

select count(*)
from product_order
where member_number = 9
order by order_date desc;

select *
from payment
order by id desc;

select p.order_number,
       p.amount,
       p.buyer_name,
       p.buyer_date,
       po.name,
       po.quantity,
       po.total_price,
       po.order_date
from payment p
         join product_order po
              on po.payment_id = p.id
where p.member_number = 9
  and p.id = 13
order by p.buyer_date desc
/** 필요한 데이터 payment_id,
              limit #{값} => order테이블에서 해당하는 payment를 가지고 있는 개수로 구함

 */


/*
select p.order_number, p.amount, p.buyer_name, p.buyer_date, po.name, po.quantity, po.order_date
from payment p
         join product_order po
              on p.id = po.payment_id
where p.member_number = 9;
*/