const { productsServices } = require('../services');

const getAll = async (_req, res) => {
  const { message } = await productsServices.getAll();
  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.findById(id);

  if (!type) return res.status(200).json(message);
  return res.status(404).json({ message });
};

module.exports = {
  getAll,
  findById,
};
