const express = require('express');
const { salesProductsController } = require('../controllers');
const { checkSaleInfo } = require('../middlewares/checkInputValues');

const router = express.Router();

router.post('/', checkSaleInfo, salesProductsController.insert);

router.get('/', salesProductsController.getAll);

router.get('/:id', salesProductsController.findById);

router.delete('/:id', salesProductsController.deleteById);

router.put('/:id', checkSaleInfo, salesProductsController.updateById);

module.exports = router;
