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
