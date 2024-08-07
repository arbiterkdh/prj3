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
alter table product
    modify column type varchar(10);

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
ALTER TABLE payment
    ADD COLUMN qr_code VARCHAR(200);

ALTER TABLE payment
    MODIFY COLUMN qr_code TEXT;

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
alter table product_order
    modify column reg_date varchar(50) default 'no cart date single product';


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


select *
from payment
order by buyer_date desc;

select payment.qr_code
from payment
order by id desc;


select p.order_number,
       p.amount,
       p.buyer_name,
       p.buyer_date,
       po.name,
       po.file_name,
       po.quantity,
       po.total_price,
       po.order_date
from payment p
         join product_order po
              on po.payment_id = p.id
where p.member_number = 9
  and p.id = 21;

CREATE TABLE product_qna_comment
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    content        VARCHAR(100) NOT NULL,
    reg_date       DATETIME DEFAULT NOW(),
    product_qna_id INT REFERENCES product_qna (id),
    is_admin       BOOLEAN
);

select *
from product_qna
where id = 4;

select *
from product_qna_comment;

drop table product_qna_comment;

select *
from product_qna pq
         left join product_qna_comment pqc
                   on pq.id = pqc.product_qna_id
where pqc.product_qna_id is null;


select pq.*
from product_qna pq
         left join product_qna_comment pqc
                   on pq.id = pqc.product_qna_id and is_admin = true
where pqc.product_qna_id is null;


SELECT *, CHAR_LENGTH(qr_code) AS length
FROM payment
order by buyer_date desc;

select p.order_number, p.buyer_date, p.amount, p.qr_code, po.name, po.quantity, po.price
from payment p
         join product_order po
              on po.payment_id = p.id
where p.buyer_name = '계영'
group by order_date
order by order_date desc;

SELECT po.name,
       po.quantity,
       po.order_date,
       COUNT(*)            AS order_count,
       SUM(po.total_price) AS total_sales
FROM product_order po
         JOIN payment p ON po.payment_id = p.id
WHERE p.member_number = 9
GROUP BY po.order_date
ORDER BY po.order_date DESC;


SELECT po.*, DATE(order_date) AS order_date, COUNT(*) AS order_count, SUM(total_price) AS total_sales
FROM product_order po
GROUP BY DATE(order_date)
ORDER BY order_date desc;


CREATE TABLE payment_cancel
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    order_number  varchar(50),
    payment_id    INT REFERENCES payment (id),
    cancel_reason VARCHAR(100),
    requestor     VARCHAR(100),
    amount        LONG,
    cancelled_at  LONG,
    receipt_url   VARCHAR(200),
    card_name     VARCHAR(100),
    name          VARCHAR(100),
    imp_uid       VARCHAR(50),
    card_number   VARCHAR(50)
);

select *
from payment
order by id desc;
select *
from payment_cancel
order by id desc;
select *
from product;
select *
from product_order
order by id desc;

select *
from product_cart;

select name, sum(quantity) as totalQuantity
from product_order
group by name
order by totalQuantity desc
limit 5;



select p.id    as payment_id,
       p.order_number,
       p.status,
       p.buyer_date,
       p.qr_code,
       p.buyer_name,
       po.name as product_name,
       po.quantity,
       po.price,
       po.total_price
from payment p
         join product_order po on po.payment_id = p.id
where p.buyer_name = '계영'
order by p.buyer_date desc
limit 0, 10;

select *
from member;

drop table product_cart;

select *
from product_cart;

select distinct (po.name)      as cancelName,
                po.quantity    as cancelQuantity,
                po.price       as cancelPrice,
                po.total_price as cancelTotalPrice
from payment_cancel pc
         join payment p
              on pc.order_number = p.order_number
         join product_order po
              on po.payment_id = p.id
where pc.order_number = 'OrderNo_15370';

select *
from product_order
where member_number = 9
  and product_id = 7
order by id desc;

select *
from product;

select *
from payment
order by id desc;

select *
from product_order
order by id desc;


select count(*)
from product_order po
         join payment p
              on po.payment_id = p.id
where po.member_number = 9
#   and po.product_id = 11
  and p.status = 'paid'
order by po.id desc;

select p.id,
       p.order_number,
       p.status,
       p.buyer_date,
       p.amount,
       p.qr_code,
       p.buyer_name,
       po.name        as name,
       po.quantity    as quantity,
       po.price       as price,
       po.total_price as totalPrice
from payment p
         join product_order po
              on po.payment_id = p.id
where p.buyer_name = '생존코딩'
group by order_date
order by order_date desc
limit 0, 10;

select *
from payment_cancel
order by id desc;

select *
from product_order
order by id desc;

select *
from payment
order by id desc;

select *
from product_qna
where product_id = 11;

select *
FROM product_qna_comment
WHERE product_qna_id = 4;

select *
from product
where id = 20;
update product
set stock = 0
where id = 20;


