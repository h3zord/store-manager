const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { productsServices } = require('../../../src/services');
const { productsController } = require('../../../src/controllers')
const { expectReturn, newProduct, validName, invalidName } = require('./mocks/productsControllerMock');
const app = require('../../../src/app');

chai.use(sinonChai);
chai.use(chaiHttp);

describe('Teste dos produtos na camada controller', function () {
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

  describe('Adicionar um novo produto', function () {
    it('Retorna status 201 e um objeto com os dados da pessoa cadastrada em caso de sucesso', async function () {
      const res = {};
      const req = { body: validName };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'insert').resolves({ type: null, message: newProduct });

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });

    it('Retorna status 422 e uma mensagem de erro caso o campo "name" seja inválido', async function () {
      const res = {};
      const req = { body: invalidName };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'insert').resolves({ type: 'NAME_IS_INVALID', message: '"name" length must be at least 5 characters long' });

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('Retorna status 400 e uma mensagem de erro caso o campo "name" seja inexistente', async function () {
      const res = await chai
        .request(app)
        .post('/products')
        .send({});
      
      expect(res.status).to.be.eq(400);
      expect(res.text).to.be.eq('{"message":"\\"name\\" is required"}');
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});