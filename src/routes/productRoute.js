const express = require('express');
const router = express.Router()
const {createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct} = require('../controllers/productContoller');
const uploadImage = require('../controllers/productImageController')

    router
    .post('/', createProduct)
    .post('/image/upload', uploadImage )
    .get('/all', getAllProduct)
    .get('/:productId', getSingleProduct)
    .patch('/:productId', updateProduct)
    .delete('/:productId', deleteProduct)
    

module.exports = router