DROP DATABASE IF EXISTS ice_creamDB;

CREATE DATABASE ice_creamDB;

USE ice_creamDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  flavor VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);




INSERT INTO products (flavor, price, quantity)
VALUES ("vanilla", 2.50, 100),
       ("chocolate", 3.10, 120),
       ("strawberry", 3.25, 75);
