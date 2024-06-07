use prj3;

CREATE TABLE product
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    name     VARCHAR(100)  NOT NULL,
    content  VARCHAR(2000) NOT NULL,
    price    INT           NOT NULL,
    stock    INT           NOT NULL,
    reg_date DATETIME DEFAULT NOW()
);

CREATE TABLE product_image
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(200) NOT NULL,
    path       VARCHAR(200) NOT NULL,
    product_id INT REFERENCES product (id)
);

CREATE TABLE product_cart
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(200),
    
    product_id INT REFERENCES product (id),
    reg_date   DATETIME DEFAULT NOW()
);

SELECT *
FROM product;
SELECT *
FROM product_image;