const expectReturn = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
];

const validName = { "name": "Alexa" };
const invalidName = { "name": "Gelo" };

const newProduct = [
  {
    "id": 1,
    "name": validName,
  }
];

const udpatedProduct = {
  "id": 1,
  "name": "Martelo do Batman"
};

module.exports = {
  expectReturn,
  validName,
  newProduct,
  invalidName,
  udpatedProduct,
};