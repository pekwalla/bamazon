-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS bamazon_db;
-- Create a database called bamazon_db --
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
  item_id INTEGER(11) NOT NULL,
  product_name VARCHAR(30),
  department VARCHAR(25),
  price INTEGER(6),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
 
);

select * FROM products WHERE  item_id = 508;
UPDATE products SET stock_quantity = stock_quantity - 6 WHERE item_id = 619;
select * FROM products WHERE  item_id = 619;



-- Creates new rows
        

INSERT INTO products (item_id, product_name, department, price, stock_quantity)
  VALUES(101, "Toilet Paper", "Groceries", 10, 95),
       (105, "Pencil", "Supplies", 3, 99),
       (205, "TV", "Electronics", 1500, 98),
       (304, "Cardigan", "Clothing", 20, 70),
       (508,"Tennis Shoes", "Shoes", 70, 45),
       (504, "pants", "football", 39.99, 15),
	     (619, "shorts", "soccer", 19.99, 19),
	     (720, "gloves", "baseball", 49.99, 11),
	     (808, "bats", "baseball", 69.99, 10),
	     (913, "pucks", "hockey", 9.99, 19),
	     (1009, "shoes", "basketball", 89.99, 17);
         SELECT * FROM products;
 
