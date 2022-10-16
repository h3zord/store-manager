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

const updateById = async (productId, name) => {
  const { type, message } = validateProductInfo(name);
  if (type) return { type, message, status: 422 };

  const changedRows = await productsModel.updateById(productId, { name });
  if (changedRows) {
    const result = await productsModel.findById(productId);
    return { type: null, message: result };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found', status: 404 };
};

const deleteById = async (productId) => {
  const result = await productsModel.deleteById(productId);
  console.log(result);
  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  getAll,
  findById,
  insert,
  updateById,
  deleteById,
}; 
