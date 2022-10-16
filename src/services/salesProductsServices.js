const { salesModel } = require('../models');
const {
  formattedInsert,
  formattedGetAll,
  formattedFindById,
} = require('./utilities/formattedResults');
const { quantityIsValid, doesProductExist } = require('./validation/validationsInputValues');

const insert = async (saleInfo) => {
  const { type: typeQuant, message: msgQuant, status: stsQuant } = quantityIsValid(saleInfo);
  if (typeQuant) return { type: typeQuant, message: msgQuant, status: stsQuant };
  const { type: typePrdId, message: msgPrdId, status: stsPrdId } = await doesProductExist(saleInfo);
  if (typePrdId) return { type: typePrdId, message: msgPrdId, status: stsPrdId };

  const message = await formattedInsert(saleInfo);

  return { type: null, message };
};

const getAll = async () => {
  const message = await formattedGetAll();
  return { status: 200, message };
};

const findById = async (saleId) => {
  const result = await salesModel.findById(saleId);
  
  if (!result) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const message = await formattedFindById(saleId);

  return { type: null, message };
};

const deleteById = async (saleId) => {
  const result = await salesModel.deleteById(saleId);

  if (!result) return { type: 'SALES_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: '' };
};

module.exports = {
  insert,
  getAll,
  findById,
  deleteById,
};