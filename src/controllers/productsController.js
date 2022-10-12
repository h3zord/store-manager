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

const insert = async (req, res) => {
  const { name } = req.body;
  if (name) {
    const { type, message } = await productsServices.insert(name);
    if (!type) return res.status(201).json(message);
    return res.status(422).json({ message });
  }
  return res.status(400).json({ message: '"name" is required' });
};

module.exports = {
  getAll,
  findById,
  insert,
}; 
