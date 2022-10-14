const { expect } = require('chai');
const sinon = require('sinon');
const { invalidQuantitySale, invalidIdSale, validSale, sucessSale, getAllSales, formattedGetAllSales, dateSale, formattedFindByIdSale } = require('./mocks/salesServicesMock');
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
  describe('Testando se retorna todas as vendas ', function () {
    it('Testando se retorna um objeto com todas as vendas e o status 200', async function () {
      sinon.stub(salesProductsModel, 'getAll').resolves(getAllSales);
      sinon.stub(salesModel, 'findById').resolves(dateSale);

      const result = await salesProductsServices.getAll();

      expect(result.message).to.be.deep.eq(formattedGetAllSales);
      expect(result.status).to.be.eq(200)
    });
  });
  describe('Testando se retorna uma venda específica', function () {
    it('Testando se retorna um erro se a venda não existir', async () => {
      sinon.stub(salesModel, 'findById').resolves(undefined);

      const result = await salesProductsServices.findById(999);

      expect(result.message).to.be.eq('Sale not found');
    });
    it('Testando se retorna um objeto caso a venda exista', async () => {
      sinon.stub(salesProductsModel, 'findById').resolves(getAllSales);

      const result = await salesProductsServices.findById(1);
  
      expect(result.status).to.be.eq(200);
      // expect(result.message).to.be.eq(formattedFindByIdSale);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
}); 