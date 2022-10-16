const { salesProductsModel } = require('../../models');
const { salesModel } = require('../../models');

const formattedInsert = async (saleInfo) => {
  const saleId = await salesModel.insert();

  saleInfo.forEach(async ({ productId, quantity }) => {
    await salesProductsModel.insert({ saleId, productId, quantity });
  });

  const result = {
    id: saleId,
    itemsSold: saleInfo,
  };
  return result;
};

const formattedGetAll = async () => {
  const result = await salesProductsModel.getAll();
  const formattedResult = await Promise.all(
    result.map(async ({ saleId, productId, quantity }) => {
      const { date } = await salesModel.findById(saleId);
      const allSales = {
        saleId,
        date,
        productId,
        quantity,
      };
      return allSales;
    }),
  );
  return formattedResult;
};

const formattedFindById = async (saleId) => {
  const result = await salesProductsModel.findById(saleId);

  const formattedResult = await Promise.all(
    result.map(async ({ productId, quantity }) => {
      const { date } = await salesModel.findById(saleId);
      const allSales = {
        date,
        productId,
        quantity,
      };
      return allSales;
    }),
  );
  return formattedResult;
};

const formattedUpdateById = async (saleId, saleInfo) => {
  const getSalesById = await salesProductsModel.findById(saleId);

  saleInfo.forEach(async ({ productId, quantity }, index) => {
    const { productId: idOutDated, quantity: quantityOutDated } = getSalesById[index];
  
    await salesProductsModel
      .updateById(saleId, { productId, quantity }, { idOutDated, quantityOutDated });
  });

  const result = {
    saleId,
    itemsUpdated: saleInfo,
  };
  return result;
};

module.exports = {
  formattedInsert,
  formattedGetAll,
  formattedFindById,
  formattedUpdateById,
};