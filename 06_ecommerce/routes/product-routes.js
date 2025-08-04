const express = require('express');
const { getAllProducts, getSingleProductById, addNewProduct, updateProduct, deleteProduct } = require('../controllers/product-controller');

// create express router
const router =  express.Router();

// all routes that are related o Products only.
router.get('/', getAllProducts);
router.get('/:id', getSingleProductById);
router.post('/', addNewProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;