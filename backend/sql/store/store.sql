use prj3;

create table product
(
    id       int primary key auto_increment,
    name     varchar(100)  not null,
    content  varchar(2000) not null,
    price    int           not null,
    stock    int           not null,
    reg_date datetime default now()
);
alter table product
    add column path varchar(200) not null;

alter table product
    modify column path varchar(200);

alter table product
    drop column path;



create table product_image
(
    id         int primary key auto_increment,
    name       varchar(200) not null,
    path       varchar(200) not null,
    product_id int references product (id)
);

select *
from product;

select *
from product_image;

drop table product;
drop table product_image;

select p.id, p.name, p.content, p.price, pi.path
from product p
         join product_image pi
              on p.id = pi.product_id;

select *
from product_image;

select *
from product;