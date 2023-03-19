const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsServices } = require('../../../src/services');
const { expectReturn, registeredProduct ,validName, invalidName, udpatedProduct, expectReturnByQuery, allProductsByQuery } = require('./mocks/productsServicesMock');

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

  describe('Atualiza um produto pelo ID', function () {
    it('Verifica se retorna um objeto com as informações atualizadas', async function () {
      sinon.stub(productsModel, 'updateById').resolves(1);
      sinon.stub(productsModel, 'findById').resolves({ id: 1, name: 'Martelo do Batman' });

      const result = await productsServices.updateById(1, 'Martelo do Batman');

      expect(result.message).to.be.deep.eq(udpatedProduct);
    });

    it('Retorna um erro se o produto for inexistente', async function () {
      sinon.stub(productsModel, 'updateById').resolves(undefined);

      const result = await productsServices.updateById(999, 'Martelo do Batman');
      expect(result.message).to.be.eq('Product not found');
    });

    it('Verifica se retorna um erro se o name for invalido', async function () {
      const result = await productsServices.updateById(1, 'abc');

      expect(result.status).to.be.eq(422);
      expect(result.message).to.be.eq('"name" length must be at least 5 characters long');
    });
  });

  describe('Deletando um produto pelo ID', function () {
    it('Testando se retorna uam mensagem e o erro 404 se o produto não existir', async function () {
      sinon.stub(productsModel, 'deleteById').resolves(undefined);

      const result = await productsServices.deleteById(999);

      expect(result.type).to.be.eq('PRODUCT_NOT_FOUND')
      expect(result.message).to.be.eq('Product not found');
    });

    it('Testando se o type é null caso o produto exista', async function () {
      sinon.stub(productsModel, 'deleteById').resolves(1);

      const result = await productsServices.deleteById(1);

      expect(result.type).to.be.eq(null);
    });
  });

  describe('Buscando um produto pela query', function () {
    it('Verificando se retorna um array com as informações do produto', async function () {
      sinon.stub(productsModel, 'findByQuery').resolves(expectReturnByQuery);

      const result = await productsServices.findByQuery('%Martelo%');

      expect(result.message).to.be.deep.eq(expectReturnByQuery);
    });

    it('Verifica se retorna todos os produtos se a query não for passada', async function () {
      sinon.stub(productsModel, 'findByQuery').resolves(allProductsByQuery);

      const result = await productsServices.findByQuery('%');

      expect(result.message).to.be.deep.eq(allProductsByQuery);
    });

    it('Testando se retorna uma mensagem caso nenhum produto for encontrado', async function () {
      sinon.stub(productsModel, 'findByQuery').resolves([]);

      const result = await productsServices.findByQuery('%TESTE%');

      expect(result.message).to.be.eq('Product not found');
    });
  });

  afterEach(() => {
    sinon.restore();
  });
}); 