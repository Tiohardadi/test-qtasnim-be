const express = require('express');
const router = express.Router();
const productTypeController = require('../controllers/productTypeController');

router.post('/product-types', productTypeController.createProductType);
router.get('/product-types', productTypeController.getProductTypes);
router.put('/product-types/:id', productTypeController.updateProductType);
router.delete('/product-types/:id', productTypeController.deleteProductType);

module.exports = router;
