const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { newSale, getAllSales, getSaleById } = require('./mocks/salesModelMock');
const { salesModel } = require('../../../src/models');
const { salesProductsModel } = require('../../../src/models');

describe('Testes das vendas na camada model', function () {
  describe('Testando cadastro de vendas', function () {
    it('Testando se retorna um ID em caso de sucesso', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
          .resolves([{ insertId: 3 }])
        .onSecondCall()
          .resolves([{ insertId: 4 }]);

      const result1 = await salesModel.insert();
      const result2 = await salesProductsModel.insert(newSale);

      expect(result1).to.be.eq(3);
      expect(result2).to.be.eq(4);
    });
  });
  describe('Testando o listar todas as vendas', function () {
    it('Testando se retorna todas as vendas corretamente', async function () {
      sinon.stub(connection, 'execute').resolves([getAllSales]);

      const result = await salesProductsModel.getAll();

      expect(result).to.be.deep.eq(getAllSales)
    });
  });

  describe('Testando se retorna uma venda específica', function () {
    it('Testando se retorna uma venda por ID', async function () {
      sinon.stub(connection, 'execute').resolves([getSaleById]);

      const result = await salesProductsModel.findById(1);

      expect(result).to.be.deep.eq(getSaleById);
    });
  })

  describe('Detelando uma venda pelo ID', function () {
    it('Verificando se retorna affectedRows corretamente', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await salesModel.deleteById(1);

      expect(result).to.be.eq(1);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});