DROP DATABASE IF EXISTS railway;

CREATE DATABASE railway;

CREATE TABLE railway.products (
  id INT NOT NULL auto_increment,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE railway.sales (
  id INT NOT NULL auto_increment,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE railway.sales_products (
  sale_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (sale_id)
    REFERENCES sales (id)
    ON DELETE CASCADE,
  FOREIGN KEY (product_id)
    REFERENCES products (id)
    ON DELETE CASCADE
)  ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `products`;
TRUNCATE TABLE `sales`;
TRUNCATE TABLE `sales_products`;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO railway.products (name) VALUES
    ("Martelo de Thor"),
    ("Traje de encolhimento"),
    ("Escudo do Capitão América");

INSERT INTO railway.sales (date) VALUES
    (NOW()),
    (NOW());

INSERT INTO railway.sales_products (sale_id, product_id, quantity) VALUES
    (1, 1, 5),
    (1, 2, 10),
    (2, 3, 15);