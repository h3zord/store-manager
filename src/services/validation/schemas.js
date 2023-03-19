const Joi = require('joi');

const productInfoSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleInfoSchema = Joi.object({
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  productInfoSchema,
  saleInfoSchema,
};