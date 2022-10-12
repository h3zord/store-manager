const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const { productsServices } = require('../../../src/services');
const { productsController } = require('../../../src/controllers')
const { expectReturn } = require('./mocks/productsControllerMock');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Teste dos produtos da camada controller', function () {
  describe('Listar todos os produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves({ type: null, message: expectReturn });

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectReturn);
    });
  });

  describe('Lista o produto por ID', function () {
    it('Lista o produto com ID 1', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'findById').resolves({ type: null, message: expectReturn[0] });

      await productsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectReturn[0]);
    });

    it('Retorna a mensagem "Product not found" caso nenhum produto seja encontrado', async function () {
      const res = {};
      const req = { params: { id: 9999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    })
  });

  afterEach(() => {
    sinon.restore();
  });
});