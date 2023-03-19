const { productsModel } = require('../../models');
const { productInfoSchema, saleInfoSchema } = require('./schemas');

const validateProductInfo = (name) => {
  const { error } = productInfoSchema.validate({ name });
  if (!error) return { type: null, message: '' };
  return { type: 'NAME_IS_INVALID', message: '"name" length must be at least 5 characters long' };
};

const validateSaleInfo = (quantity) => {
  const { error } = saleInfoSchema.validate({ quantity });
  if (!error) return { type: null, message: '' };
  return { type: 'QUANTITY_IS_INVALID', message: '"quantity" must be greater than or equal to 1' };
};

const quantityIsValid = (saleInfo) => {
  let type;
  let message;

  const quantityIsValidCheck = saleInfo.every(({ quantity }) => {
    const { type: typeValidation, message: messageValidation } = validateSaleInfo(quantity);
    if (typeValidation) {
      type = typeValidation;
      message = messageValidation;
      return false;
    }
    return true;
  });
  
  return quantityIsValidCheck ? { type: null, message: '' } : { type, message, status: 422 };
};

const doesProductExist = async (saleInfo) => {
  const getProducts = await Promise.all(
    saleInfo.map(async ({ productId }) => {
      const result = await productsModel.findById(productId);
      return result;
    }),
  );

  const productIdValidCheck = getProducts.every((product) => product !== undefined);
  return productIdValidCheck
    ? { type: null, message: '' }
    : { type: 'PRODUCT_NOT_FOUND', message: 'Product not found', status: 404 };
};

module.exports = {
  validateProductInfo,
  validateSaleInfo,
  quantityIsValid,
  doesProductExist,
};