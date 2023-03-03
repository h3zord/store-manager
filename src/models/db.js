/* eslint-disable max-lines-per-function */
const connection = require('./connection');

const setupDatabase = async () => {
  try {
    await connection.query('DROP SCHEMA IF EXISTS railway');
    await connection.query('CREATE DATABASE railway');
    await connection.query(`
      CREATE TABLE railway.products (
        id INT NOT NULL auto_increment,
        name VARCHAR(30) NOT NULL,
        PRIMARY KEY(id)
      ) ENGINE=INNODB;
    `);
    await connection.query(`
      CREATE TABLE railway.sales (
        id INT NOT NULL auto_increment,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id)
      ) ENGINE=INNODB;
    `);
    await connection.query(`
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
      ) ENGINE=INNODB;
    `);
    await connection.query(`
      SET SQL_SAFE_UPDATES = 0;
    `);
    await connection.query(`
      SET FOREIGN_KEY_CHECKS = 0;
    `);
    await connection.query('TRUNCATE TABLE railway.products');
    await connection.query('TRUNCATE TABLE railway.sales');
    await connection.query('TRUNCATE TABLE railway.sales_products');
    await connection.query(`
      SET FOREIGN_KEY_CHECKS = 1;
    `);
    await connection.query(`
      INSERT INTO railway.products (name) VALUES
        ("Martelo de Thor"),
        ("Traje de encolhimento"),
        ("Escudo do Capitão América");
    `);
    await connection.query(`
      INSERT INTO railway.sales (date) VALUES
        (NOW()),
        (NOW());
    `);
    await connection.query(`
      INSERT INTO railway.sales_products (sale_id, product_id, quantity) VALUES
        (1, 1, 5),
        (1, 2, 10),
        (2, 3, 15); 
  `);
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await connection.end();
  }
};

setupDatabase();

module.exports = setupDatabase;
