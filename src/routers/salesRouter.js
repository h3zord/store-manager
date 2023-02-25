const express = require('express');
const { salesProductsController } = require('../controllers');
const { checkSaleInfo } = require('../middlewares/checkInputValues');

const router = express.Router();

router.post(
  '/sales', 
  checkSaleInfo, 
  salesProductsController.insert

  // #swagger.tags = ['Sales']
  // #swagger.summary = 'Cadastrar uma nova venda'
  // #swagger.description = 'Endpoint para cadastrar uma nova venda no banco de dados.'

  /* #swagger.parameters['info'] = {
    in: 'body',
    description: 'Informações necessárias para criar uma nova venda.',
    type: 'array',
    schema: { $ref: "#/definitions/CreateSale" },
  } */

 /* #swagger.responses[201] = {
    schema: { $ref: "#/definitions/CreatedSale" },
    description: 'Requisição para cadastrar uma nova venda no banco de dados efetuada com sucesso!'
  } */

  /* #swagger.responses[400] = {
    schema: { $ref: "#/definitions/InvalidBodyCreateSale" },
    description: 'Erro! A requisição falhou! Verifique se o body foi preenchido corretamente.'
  } */

  /* #swagger.responses[404] = {
    schema: { $ref: "#/definitions/ProductNotFoundError" },
    description: 'Erro! A requisição falhou! Algum dos produtos não foi encontrado no banco de dados.'
  } */
  
  /* #swagger.responses[422] = {
    schema: { $ref: "#/definitions/InvalidQuantityError" },
    description: 'Erro! A requisição falhou! A quantidade fornecida é inválida.'
  } */,
);

router.get(
  '/sales',
  salesProductsController.getAll

  // #swagger.tags = ['Sales']
  // #swagger.summary = 'Listar todas as vendas'
  // #swagger.description = 'Endpoint para listar todas as vendas cadastradas no banco de dados.'

  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/SaleList" },
    description: 'Requisição para listar todas as vendas cadastradas no banco de dados efetuada com sucesso!'
  } */,
);

router.get(
  '/sales/:id',
  salesProductsController.findById

  // #swagger.tags = ['Sales']
  // #swagger.summary = 'Buscar uma venda pelo seu ID'
  // #swagger.description = 'Endpoint para buscar uma venda cadastrada no banco de dados pelo seu ID.'

  /* #swagger.parameters['id'] = {
    in: 'path',
    type: 'string',
    required: true,
    description: 'ID necessário para buscar uma venda cadastrada no banco de dados.'
  } */

  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/Sale" },
    description: 'Requisição para listar a vendas cadastrada no banco de dados pelo seu ID efetuada com sucesso!'
  } */
  
   /* #swagger.responses[404] = {
    schema: { $ref: "#/definitions/SaleNotFoundError" },
    description: 'Erro! A requisição falhou! A venda não foi encontrada no banco de dados.'
  } */,
);

router.delete(
  '/sales/:id',
  salesProductsController.deleteById

  // #swagger.tags = ['Sales']
  // #swagger.summary = 'Deletar uma venda pelo seu ID'
  // #swagger.description = 'Endpoint para deletar uma venda cadastrada no banco de dados pelo seu ID.'

  /* #swagger.parameters['id'] = {
    in: 'path',
    type: 'string',
    required: true,
    description: 'ID necessário para deletar uma venda cadastrada no banco de dados.'
  } */

  /* #swagger.responses[204] = {
    description: 'A requisição para deletar uma venda cadastrada no banco de dados foi efetuada com sucesso.'
  } */

  /* #swagger.responses[404] = {
    schema: { $ref: "#/definitions/SaleNotFoundError" },
    description: 'Erro! A requisição falhou! A venda não foi encontrada no banco de dados.'
  } */,
);

router.put(
  '/sales/:id',
  checkSaleInfo,
  salesProductsController.updateById

  // #swagger.tags = ['Sales']
  // #swagger.summary = 'Atualizar uma venda pelo seu ID'
  // #swagger.description = 'Endpoint para atualizar uma venda cadastrada no banco de dados pelo seu ID.'

  /* #swagger.parameters['id'] = {
    in: 'path',
    type: 'string',
    required: true,
    description: 'ID necessário para atualizar uma venda cadastrada no banco de dados.'
  } */
  
  /* #swagger.parameters['info'] = {
    in: 'body',
    description: 'Informações necessárias para atualizar uma venda.',
    type: 'array',
    schema: { $ref: "#/definitions/CreateSale" },
  } */

  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/UpdatedSale" },
    description: 'Requisição para atualizar uma venda cadastrada no banco de dados pelo seu ID efetuada com sucesso!'
  } */
  
  /* #swagger.responses[400] = {
    schema: { $ref: "#/definitions/InvalidBodyCreateSale" },
    description: 'Erro! A requisição falhou! Verifique se o body foi preenchido corretamente.'
  } */

  /* #swagger.responses[401] = {
    schema: { $ref: "#/definitions/SaleNotFoundError" },
    description: 'Erro! A requisição falhou! A venda não foi encontrada no banco de dados.'
  } */

  /* #swagger.responses[404] = {
    schema: { $ref: "#/definitions/ProductNotFoundError" },
    description: 'Erro! A requisição falhou! Algum dos produtos não foi encontrado no banco de dados.'
  } */

  /* #swagger.responses[422] = {
    schema: { $ref: "#/definitions/InvalidQuantityError" },
    description: 'Erro! A requisição falhou! A quantidade fornecida é inválida.'
  } */,
);

module.exports = router;
