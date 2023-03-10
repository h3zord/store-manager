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
    const { type, message } = await productsServices.insert(name);
    if (!type) return res.status(201).json(message);
    return res.status(422).json({ message });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message, status } = await productsServices.updateById(id, name);
  if (!type) return res.status(200).json(message);
  return res.status(status).json({ message });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.deleteById(id);

  if (!type) return res.status(204).json();
  return res.status(404).json({ message });
};

const findByQuery = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    const { message } = await productsServices.findByQuery('%');
    return res.status(200).json(message);
  }
  
  const { type, message } = await productsServices.findByQuery(q);

  if (!type) return res.status(200).json(message);

  return res.status(404).json({ message });
};

module.exports = {
  getAll,
  findById,
  insert,
  updateById,
  deleteById,
  findByQuery,
}; 
