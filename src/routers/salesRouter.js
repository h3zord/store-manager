const express = require('express');
const { salesProductsController } = require('../controllers');
const { checkSaleInfo } = require('../middlewares/checkInputValues');

const router = express.Router();

router.post('/', checkSaleInfo, salesProductsController.insert);

module.exports = router;
