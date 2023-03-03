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
    `INSERT INTO sales_products (${columns}) VALUE (${placeholders})`,
    [...Object.values(saleInfo)],
  );
  return insertId;
};

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM sales_products',
  );
  return camelize(result);
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    'SELECT * FROM sales_products WHERE sale_id = ?',
    [saleId],
  );
  return camelize(result);
};

const updateById = async (saleId, saleInfo, saleInfoOutDated) => {
  const columns = Object.keys(snakeize(saleInfo))
    .map((key) => `${key} = ?`)
    .join(', ');
  
  const conditions = Object.keys(snakeize(saleInfo))
    .map((key) => `${key} = ?`)
    .join(' AND ');
  
  const [{ changedRows }] = await connection.execute(
    `UPDATE sales_products SET ${columns} WHERE sale_id = ? AND ${conditions}`,
    [...Object.values(saleInfo), saleId, ...Object.values(saleInfoOutDated)],
  );
  return changedRows;
};

module.exports = {
  insert,
  getAll,
  findById,
  updateById,
};