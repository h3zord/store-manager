const { expect } = require('chai');
const sinon = require('sinon');
const { invalidQuantitySale, invalidIdSale, validSale, sucessSale } = require('./mocks/salesServicesMock');
const { productsModel, salesModel, salesProductsModel } = require('../../../src/models');
const { salesProductsServices } = require('../../../src/services')

describe('Teste das vendas na camada services', function () {
  describe('Adicionar um novo cadastro de vendas', function () {
    it('Testando se retorna um erro se a quantidade for menor ou igual a 0', async function () {
      const result = await salesProductsServices.insert(invalidQuantitySale);

      expect(result.message).to.be.eq('"quantity" must be greater than or equal to 1');
    });

    it('Testando se retorna um erro se o ProductId for inexistente', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await salesProductsServices.insert(invalidIdSale);

      expect(result.message).to.be.eq('Product not found');
    });

    it('Testando se retorna um objeto se a venda foi cadastrada com sucesso', async function () {
      sinon.stub(salesModel, 'insert').resolves(1);
      sinon.stub(salesProductsModel, 'insert').resolves(1);

      const result = await salesProductsServices.insert(validSale);

      expect(result.message).to.be.deep.eq(sucessSale);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
}); 