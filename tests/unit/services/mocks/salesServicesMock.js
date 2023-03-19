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
  
const getAllSales = [
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

const dateSale = {
  "saleId": 1,
  "date": "2021-09-09T04:54:29.000Z",
};

const formattedFindByIdSale = [
  {
    "date": '2021-09-09T04:54:29.000Z',
    "productId": 1,
    "quantity": 2
  },
  {
    "date": '2021-09-09T04:54:29.000Z',
    "productId": 2,
    "quantity": 2
  },
];

const updatedInfoSale = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  },
];

const updatedSale = {
  "saleId": 1,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 50
    },
  ],
};

module.exports = {
  invalidQuantitySale,
  invalidIdSale,
  validSale,
  sucessSale,
  getAllSales,
  formattedGetAllSales,
  dateSale,
  formattedFindByIdSale,
  updatedInfoSale,
  updatedSale,
};