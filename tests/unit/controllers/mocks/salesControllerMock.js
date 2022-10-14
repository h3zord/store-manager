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

const formattedGetAllSales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 2,
    "quantity": 2
  },
];

const formattedFindByIdSale = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 2,
    "quantity": 2
  },
];

module.exports = {
  sucessSale,
  formattedGetAllSales,
  formattedFindByIdSale,
};