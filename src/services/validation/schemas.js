const Joi = require('joi');

const productInfoSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  productInfoSchema,
};