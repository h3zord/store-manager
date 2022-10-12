const { productInfoSchema } = require('./schemas');

const validateProductInfo = (name) => {
  const { error } = productInfoSchema.validate({ name });
  if (!error) return { type: null, message: '' };
  return { type: 'NAME_IS_INVALID', message: '"name" length must be at least 5 characters long' };
};

module.exports = {
  validateProductInfo,
};