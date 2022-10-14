const { salesProductsServices } = require('../services');

const insert = async (req, res) => {
  const { type, message, status } = await salesProductsServices.insert(req.body);
  if (!type) return res.status(201).json(message);
  return res.status(status).json({ message });
};

module.exports = {
  insert,
};
