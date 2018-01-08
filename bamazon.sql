DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fire 7", "Electronics", 49.99, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beats Solo2", "Electronics", 159.95, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire TV Stick", "Electronics", 39.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 299.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LEGO Star Wars VIII BB-8", "Toys", 97.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fingerlings - Interactive Baby Monkey", "Toys", 14.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Room", "Movies", 10.56, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rogue One: A Star Wars Story", "Movies", 22.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wonder Woman", "Movies", 24.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cars 3", "Movies", 14.10, 450);

SELECT * FROM products;




