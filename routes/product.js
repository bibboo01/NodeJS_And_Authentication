const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth')


const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

router.get('/:id',authenticateToken, getProduct);
router.get('/',authenticateToken, getProducts);
router.post('/',authenticateToken, createProduct);
router.put('/:id',authenticateToken, updateProduct);
router.delete('/id',authenticateToken, deleteProduct);

module.exports = router;