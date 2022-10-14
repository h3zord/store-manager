const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (saleInfo) => {
  const columns = Object.keys(snakeize(saleInfo))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(saleInfo)
    .map((_key) => '?')
    .join(', ');
  
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns}) VALUE (${placeholders})`,
    [...Object.values(saleInfo)],
  );
  return insertId;
};

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return camelize(result);
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );
  return camelize(result);
};

module.exports = {
  insert,
  getAll,
  findById,
};