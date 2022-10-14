const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { newSale } = require('./mocks/salesModelMock');
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

  afterEach(() => {
    sinon.restore();
  });
});