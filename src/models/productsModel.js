const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const getAll = async () => { 
  const [result] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC',
  );
  return camelize(result);
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return camelize(result);
};

const insert = async (productInfo) => {
  const columns = Object.keys(snakeize(productInfo))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(productInfo)
    .map((_key) => '?')
    .join(', ');
  
  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${columns}) VALUE (${placeholders})`,
    [...Object.values(productInfo)],
  );
  return insertId;
};

const updateById = async (productId, productInfo) => {
  const columns = Object.keys(snakeize(productInfo))
    .map((key) => `${key} = ?`)
    .join(', ');
  
  const [{ changedRows }] = await connection.execute(
    `UPDATE products SET ${columns} WHERE id = ?`,
    [...Object.values(productInfo), productId],
  );
  return changedRows;
};

const deleteById = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [productId],
  );
  return affectedRows;
};

const findByQuery = async (query) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE ?',
    [query],
  );
  return result;
};

module.exports = {
  getAll,
  findById,
  insert,
  updateById,
  deleteById,
  findByQuery,
};