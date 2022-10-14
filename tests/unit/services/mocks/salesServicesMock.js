const invalidQuantitySale = [
  {
    "productId": 1,
    "quantity": 0
  },
];

const invalidIdSale = [
  {
    "productId": 9999,
    "quantity": 10,
  },
];

const validSale = [
  {
    "productId": 1,
    "quantity": 10,
  },
];

const sucessSale = {
    "id": 1,
    "itemsSold": validSale,
  };

module.exports = {
  invalidQuantitySale,
  invalidIdSale,
  validSale,
  sucessSale,
};