const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);

  if (product) return { type: null, message: product };
  return { type: 'PASSENGER_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getAll,
  findById,
};
