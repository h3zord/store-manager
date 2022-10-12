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

const validName = "Alexa";
const invalidName = "gelo";

const registeredProduct = [
  {
    "id": 1,
    "name": validName,
  }
]

module.exports = {
  expectReturn,
  registeredProduct,
  validName,
  invalidName,
}