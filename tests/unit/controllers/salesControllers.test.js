const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { sucessSale, formattedGetAllSales, formattedFindByIdSale, updatedSale, } = require('./mocks/salesControllerMock');
const { salesProductsController } = require('../../../src/controllers');
const { salesProductsServices } = require('../../../src/services');
const app = require('../../../src/app');


chai.use(sinonChai);
chai.use(chaiHttp);

describe('Teste das vendas na camada controller', function () {
  describe('Testando um novo cadastro de vendas', function () {
    it('Testando se retorna um erro se o productId for inexistente', async function () {
      const res = await chai
        .request(app)
        .post('/sales')
        .send([{ quantity: 10 }]);
      
      expect(res.status).to.be.eq(400);
    });

    it('Testando se retorna um erro se quantity for inexistente', async function () {
      const res = await chai
        .request(app)
        .post('/sales')
        .send([{ productId: 1 }]);

      expect(res.status).to.be.eq(400);
      expect(res.text).to.be.equal('{"message":"\\"quantity\\" is required"}')
    });

    it('Testando se retorna o status 422 se quantity for igual ou menor que 0', async function () {
      const res = {};
      const req = { body: [{ productId: 1, quantity: 0 }] };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsServices, 'insert').resolves({ type: 'QUANTITY_INVALID', message: '"quantity" must be greater than or equal to 1', status: 422 });

      await salesProductsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Testando se retorna o status 404 se o produto não for encontrado', async function () {
      const res = {};
      const req = { body: [{ productId: 9999, quantity: 10 }] };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsServices, 'insert').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found', status: 404 });

      await salesProductsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Testando se retorna o status 201 se a venda for bem sucedida', async function () {
      const res = {};
      const req = { body: [{ productId: 1, quantity: 10 }] };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsServices, 'insert').resolves({ type: null, message: sucessSale });

      await salesProductsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(sucessSale);
    })
  });

  describe('Testando o retorno de todas as vendas', function () {
    it('Testando se retorna o status 200 e um objeto com todas as vendas', async () => {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsServices, 'getAll').resolves({ status: 200, message: formattedGetAllSales });

      await salesProductsController.getAll(req, res)

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(formattedGetAllSales);
    });
  });

  describe('Testando o retorno de uma venda pelo ID', function () {
    it('Testando se retorna um objeto e o status 200', async function () {
      const res = {};
      const req = { params: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsServices, 'findById').resolves({ status: 200, message: formattedFindByIdSale });

      await salesProductsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(formattedFindByIdSale);
    });

    it('Testando se retorna um erro se o id for invalido', async function () {
      const res = {};
      const req = { params: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsServices, 'findById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await salesProductsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Deletando uma venda pelo ID', function () {
    it('Verificando se retorna o status 404 e uma mensagem de erro caso a venda não tenha sido deletada', async function () {
      const res = {};
      const req = { params: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsServices, 'deleteById').resolves({ type: 'SALES_NOT_FOUND', message: 'Sale not found' });

      await salesProductsController.deleteById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Verificando se retorna o status 204 caso a venda tenha sido deletada', async function () {
      const res = {};
      const req = { params: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsServices, 'deleteById').resolves({ type: null, message: '' });

      await salesProductsController.deleteById(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
  });

  describe('Atualizando uma venda por ID', function () {
    it('Testando se retorna o erro 404 e uma mensagem se a venda não existir', async function () {
      const res = {};
      const req = { params: 999, body: [{ "productId": 1, "quantity": 10 }] };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsServices, 'updateById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found', status: 404 });

      await salesProductsController.updateById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Testando se retorna o status 200 e um objeto com as informações da venda atualizadas', async function () {
      const res = {};
      const req = {
        params: 1,
        body:
          [
            { "productId": 1, "quantity": 10 },
            { "productId": 2, "quantity": 50 },
          ]
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsServices, 'updateById').resolves({ type: '', message: updatedSale });

      await salesProductsController.updateById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedSale);
    });

    it('Testando de retorna um erro se productId for inexistente', async function () {
      const res = await chai
        .request(app)
        .put('/sales/:id')
        .send([{ quantity: 1 }]);

      expect(res.status).to.be.eq(400);
      expect(res.text).to.be.equal('{"message":"\\"productId\\" is required"}')
    });

    it('Testando de retorna um erro se quantity for inexistente', async function () {
      const res = await chai
        .request(app)
        .put('/sales/:id')
        .send([{ productId: 1 }]);

      expect(res.status).to.be.eq(400);
      expect(res.text).to.be.equal('{"message":"\\"quantity\\" is required"}')
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});