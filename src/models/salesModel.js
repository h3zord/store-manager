const connection = require('./connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUE ()',
    [],
  );
  return insertId;
};

const findById = async (saleId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [saleId],
  );
  return result;
};

const deleteById = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE ID = ?',
    [saleId],
  );
  return affectedRows;
};

module.exports = {
  insert,
  findById,
  deleteById,
};