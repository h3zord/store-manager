const { salesModel, salesProductsModel } = require('../models');
const { quantityIsValid, doesProductExist } = require('./validation/validationsInputValues');

const insert = async (saleInfo) => {
  const { type: typeQuant, message: msgQuant, status: stsQuant } = quantityIsValid(saleInfo);
  if (typeQuant) return { type: typeQuant, message: msgQuant, status: stsQuant };
  const { type: typePrdId, message: msgPrdId, status: stsPrdId } = await doesProductExist(saleInfo);
  if (typePrdId) return { type: typePrdId, message: msgPrdId, status: stsPrdId };

  const saleId = await salesModel.insert();
  
  saleInfo.forEach(async ({ productId, quantity }) => {
    await salesProductsModel.insert({ saleId, productId, quantity });
  });

  const message = {
    id: saleId,
    itemsSold: saleInfo,
  };

  return { type: null, message };
};

module.exports = {
  insert,
};