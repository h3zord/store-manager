const express = require('express');
const { productsController } = require('../controllers');
const { checkProductInfo } = require('../middlewares/checkInputValues');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.findById);

router.post('/', checkProductInfo, productsController.insert);

module.exports = router;