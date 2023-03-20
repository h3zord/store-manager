const express = require('express');
const { productsController } = require('../controllers');
const { checkProductInfo } = require('../middlewares/checkInputValues');

const router = express.Router();

router.post(
  '/products',
  checkProductInfo,
  productsController.insert

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Cadastrar um novo produto'
  // #swagger.description = 'Endpoint para cadastrar um novo produto no banco de dados.'

  /* #swagger.parameters['info'] = {
    in: 'body',
    description: 'Informações necessárias para cadastrar um novo produto.',
    type: 'object',
    schema: { $ref: "#/definitions/CreateProduct" },
  } */

  /* #swagger.responses[201] = {
    schema: { $ref: "#/definitions/CreateProduct" },
    description: 'Requisição para cadastrar um novo produto no banco de dados efetuada com sucesso!'
  } */

  /* #swagger.responses[400] = {
    schema: { $ref: "#/definitions/InvalidBodyError" },
    description: 'Erro! A requisição falhou! Verifique se o body foi preenchido corretamente.'
  } */

  /* #swagger.responses[422] = {
    schema: { $ref: "#/definitions/InvalidNameError" },
    description: 'Erro! A requisição falhou! Verifique se o name foi preenchido corretamente.'
  } */,
);

router.get(
  '/products', 
  productsController.getAll

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Listar todos os produtos'
  // #swagger.description = 'Endpoint para listar todos os produtos cadastrados no banco de dados.'
  
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/ProductList" },
    description: 'Requisição para listar todos os produtos cadastrados no banco de dados efetuada com sucesso!'
  } */,
);

router.get(
  '/products/search',
  productsController.findByQuery

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Buscar os produtos através de uma query'
  // #swagger.description = 'Endpoint para buscar um produto cadastrado no banco de dados através de uma query.'

  /* #swagger.parameters['q'] = {
    in: 'query',
    type: 'string',
    default: 'Martelo',
    required: 'true',
    description: 'Query usada para filtrar produtos específicos.'
  } */

  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/ProductList" },
    description: 'Requisição para buscar um produto pela query efetuada com sucesso!'
  } */
  
  /* #swagger.responses[404] = {
    schema: { $ref: "#/definitions/ProductNotFoundError" },
    description: 'Erro! A requisição falhou! Nenhum produto foi encontrado no banco de dados.'
  } */,
);

router.get(
  '/products/:id',
  productsController.findById

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Buscar um produto pelo seu ID'
  // #swagger.description = 'Endpoint para buscar um produto cadastrado no banco de dados pelo seu ID.'

  /* #swagger.parameters['id'] = {
    in: 'path',
    type: 'string',
    required: true,
    description: 'ID necessário para buscar um produto cadastrado no banco de dados.'
  } */

  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/ProductList" },
    description: 'Requisição para buscar um produto pelo seu ID efetuada com sucesso!'
  } */

  /* #swagger.responses[404] = {
    schema: { $ref: "#/definitions/ProductNotFoundError" },
    description: 'Erro! A requisição falhou! Nenhum produto foi encontrado no banco de dados.'
  } */,
);

router.put(
  '/products/:id',
  checkProductInfo,
  productsController.updateById

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Atualizar um produto buscando pelo seu ID'
  // #swagger.description = 'Endpoint para atualizar um produto cadastrado no banco de dados buscando pelo seu ID.'

  /* #swagger.parameters['id'] = {
    in: 'path',
    type: 'string',
    required: true,
    description: 'ID necessário para buscar um produto cadastrado no banco de dados.'
  } */

  /* #swagger.parameters['info'] = {
    in: 'body',
    description: 'Informações necessárias para atualizar um produto.',
    type: 'object',
    schema: { $ref: "#/definitions/UpdateProduct" },
  } */

  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/UpdateProduct" },
    description: 'Requisição para atualizar um produto pelo seu ID efetuada com sucesso!'
  } */

  /* #swagger.responses[400] = {
    schema: { $ref: "#/definitions/InvalidBodyError" },
    description: 'Erro! A requisição falhou! Verifique se o body foi preenchido corretamente.'
  } */

  /* #swagger.responses[404] = {
    schema: { $ref: "#/definitions/ProductNotFoundError" },
    description: 'Erro! A requisição falhou! Nenhum produto foi encontrado no banco de dados.'
  } */

/* #swagger.responses[422] = {
    schema: { $ref: "#/definitions/InvalidNameError" },
    description: 'Erro! A requisição falhou! Verifique se o name foi preenchido corretamente.'
  } */,
);

router.delete(
  '/products/:id',
  productsController.deleteById

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Deletar um produto buscando pelo seu ID'
  // #swagger.description = 'Endpoint para deletar um produto cadastrado no banco de dados buscando pelo seu ID.'

  /* #swagger.parameters['id'] = {
    in: 'path',
    type: 'string',
    required: true,
    description: 'ID necessário para deletar um produto cadastrado no banco de dados.'
  } */

  /* #swagger.responses[204] = {
    description: 'A requisição para deletar um produto cadastrado no banco de dados foi efetuada com sucesso.'
  } */

  /* #swagger.responses[404] = {
    schema: { $ref: "#/definitions/ProductNotFoundError" },
    description: 'Erro! A requisição falhou! Nenhum produto foi encontrado no banco de dados.'
  } */,
);

module.exports = router; 