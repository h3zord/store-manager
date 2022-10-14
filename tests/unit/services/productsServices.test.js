const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsServices } = require('../../../src/services');
const { expectReturn, registeredProduct ,validName, invalidName } = require('./mocks/productsServicesMock');

describe('Teste dos produtos na camada services', function () {
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

  describe('Adicionar um novo produto', function () {
    it('Retorna um objeto com as informações da pessoa cadastrada em caso de sucesso', async function () {
      sinon.stub(productsModel, 'insert').resolves(1);
      sinon.stub(productsModel, 'findById').resolves(registeredProduct[0]);

      const result = await productsServices.insert(validName);

      expect(result.type).to.be.eq(null);
      expect(result.message).to.be.deep.eq(registeredProduct[0]);
    });

    it('Retorna uma mensagem de erro caso o campo "name" seja inválido', async function () {
      const result = await productsServices.insert(invalidName);

      expect(result.type).to.be.eq('NAME_IS_INVALID');
      expect(result.message).to.be.eq('"name" length must be at least 5 characters long');
    });
  });

  afterEach(() => {
    sinon.restore();
  });
}); 