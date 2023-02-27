const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Store Manager API',
    description: 'Esta documentação é destinada ao projeto Store Manager.',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Products',
      description: 'Endpoints',
    },
    {
      name: 'Sales',
      description: 'Endpoints',
    },
  ],
  definitions: {
    Product: {
      id: 1,
      name: "Martelo de Thor"
    },
    CreateProduct: {
      name: "Tridente de Poseidon"
    },
    UpdateProduct: {
      name: "Lorem Ipsum"
    },
    ProductList: [{
      id: 1,
      name: "Martelo de Thor"
    }],
    Sale: [
      {
        date: "2023-02-24T19:39:01.000Z",
        productId: 1,
        quantity: 15
      }
    ],
    CreateSale: [
      {
        productId: 1,
        quantity: 7
      }
    ],
    CreatedSale: {
      itemsSold: [
        {
          productId: 1,
          quantity: 7
        }
      ]
    },
    UpdatedSale: {
      itemsUpdated: [
        {
          quantity: 7,
          productId: 1
        }
      ]
    },
    SaleList: [
      {
        saleId: 1,
        date: "2023-02-24T19:39:01.000Z",
        productId: 1,
        quantity: 5
      },
    ],
    InvalidBodyError: {
      message: '"name" is required'
    },
    InvalidBodyCreateSale: {
      message: '"productId" or "quantity" are missing'
    },
    InvalidNameError: {
      message: '"name" length must be at least 5 characters long'
    },
    InvalidQuantityError: {
      message: '"quantity" must be greater than or equal to 1'
    },
    SaleNotFoundError: {
      message: "Sale not found"
    },
    ProductNotFoundError: {
      message: "Product not found"
    },
  },
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = [
  './src/routers/productsRouter.js',
  './src/routers/salesRouter.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  // eslint-disable-next-line import/extensions
  require('./src/app.js'); // Your project's root file
});