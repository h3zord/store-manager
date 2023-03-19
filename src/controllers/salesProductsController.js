const { salesProductsServices } = require('../services');

const insert = async (req, res) => {
  const { type, message, status } = await salesProductsServices.insert(req.body);
  if (!type) return res.status(201).json(message);
  return res.status(status).json({ message });
};

const getAll = async (_req, res) => {
  const { message } = await salesProductsServices.getAll();
  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesProductsServices.findById(id);

  if (!type) return res.status(200).json(message);
  return res.status(404).json({ message });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesProductsServices.deleteById(id);

  if (!type) return res.status(204).json();
  return res.status(404).json({ message });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { type, message, status } = await salesProductsServices.updateById(id, req.body);

  if (!type) return res.status(200).json(message);
  return res.status(status).json({ message });
};

module.exports = {
  insert,
  getAll,
  findById,
  deleteById,
  updateById,
};
