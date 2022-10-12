const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { expectReturn, newProduct } = require('./mocks/productsModelMock')

describe('Testes dos produtos da camada model', function () {
  describe('Listar todos os produtos', function () {
    it('Deve retornar um  array com todos todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([expectReturn]);

      const result = await productsModel.getAll();

      expect(result).to.be.a('array');
      expect(result).to.be.deep.eq(expectReturn);
    });
  });

  describe('Listar os produtos por ID', function () {
    it('Lista o produto com ID 1', async function () {
      sinon.stub(connection, 'execute').resolves([[expectReturn[0]]]);

      const result = await productsModel.findById(1);

      expect(result).to.be.deep.eq(expectReturn[0]);
    });
  })

  describe('Adicionar um novo produto', function () {
    it('Deve retornar um ID em caso de sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const result = await productsModel.insert(newProduct);

      expect(result).to.be.eq(3);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});