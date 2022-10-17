const express = require('express');
const { productsController } = require('../controllers');
const { checkProductInfo } = require('../middlewares/checkInputValues');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/search', productsController.findByQuery);

router.get('/:id', productsController.findById);

router.post('/', checkProductInfo, productsController.insert);

router.put('/:id', checkProductInfo, productsController.updateById);

router.delete('/:id', productsController.deleteById);

module.exports = router;