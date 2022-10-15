const validName = "Alexa";
const invalidName = "gelo";

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

const registeredProduct = [
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
  registeredProduct,
  validName,
  invalidName,
  udpatedProduct,
};