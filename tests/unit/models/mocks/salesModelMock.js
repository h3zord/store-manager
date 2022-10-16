const newSale = [
  {
    "saleId": 3,
    "productId": 1,
    "quantity": 10,
  },
];

const getAllSales = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 2,
    "productId": 2,
    "quantity": 2
  },
];

const getSaleById = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 2
  },
];

const updatedInfoSale = {
  "productId": 1,
  "quantity": 10
};

const outDatedInfoSale = {
  "productId": 1,
  "quantity": 5
};

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
  updatedInfoSale,
  outDatedInfoSale,
};