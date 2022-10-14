const { productsModel } = require('../models');
const { validateProductInfo } = require('./validation/validationsInputValues');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);

  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insert = async (name) => {
  const { type, message } = validateProductInfo(name);
  if (!type) {
    const newProductId = await productsModel.insert({ name });
    const newProduct = await productsModel.findById(newProductId);
    return { type: null, message: newProduct };
  }
  return { type, message };
};

module.exports = {
  getAll,
  findById,
  insert,
}; 
