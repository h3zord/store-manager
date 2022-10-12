const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsServices } = require('../../../src/services');
const { expectReturn } = require('./mocks/productsServicesMock');

describe('Teste dos produtos da camada services', function () {
  describe('Listar todos os produtos', function () {
    it('Deve retornar um  array com todos todos os produtos', async function () {
      sinon.stub(productsModel, 'getAll').resolves(expectReturn);

      const result = await productsServices.getAll();

      expect(result.message).to.be.deep.eq(expectReturn);
    });
  });

  describe('Listar os produtos por ID', function () {
    it('Lista o produto com ID 1', async function () {
      sinon.stub(productsModel, 'findById').resolves(expectReturn[0]);

      const result = await productsServices.findById(1);

      expect(result.message).to.be.deep.eq(expectReturn[0]);
    });

    it('Retorna um erro caso o produto não exista', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await productsServices.findById(1);

      expect(result.message).to.be.eq('Product not found');
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});