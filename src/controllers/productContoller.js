const Product = require('../models/ProductModel');
const asyncWrapper = require('../middlewares/asyncWrapper');


// create product controller;

const createProduct = asyncWrapper(async(req, res) => {
    const { name, price, quantity, image, description} = req.body
    const product = await Product.create({
        name,
        price,
        quantity,
        image,
        description
    })
    res.status(201).json({ product})
})

// get all product 

const getAllProduct = asyncWrapper(async(req, res) => {
    const products = await Product.find({});
    if(!products) {
        return res.status(404).json({ msg: 'no products avaialable yet'})
    }
   
    res.status(200).json({nbHits: products.length, products })
})

const getSingleProduct = asyncWrapper(async(req, res) => {
    const { productId } = req.params;
    const product = await Product.findOne({_id: productId});
    if(!product) {
        return res.status(404).json({error: 'no product with id ' + productId + ' found'})
    }

    res.status(200).json({ product });
})

const updateProduct = asyncWrapper(async(req, res) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true, runValidators: true
    })
    if(!product) {
        return res.status(404).json({error: 'no product with id ' + productId + ' found'})
    }

    res.status(200).json({ product })
})

const deleteProduct = asyncWrapper(async(req, res) => {
    const { productId } = req.params;
   const product = await Product.findByIdAndDelete(productId)
   if(!product) {
    return res.status(404).json({error: 'no product with id ' + productId + ' found'})
}

   res.status(200).json({ msg: 'product deleted' })
})



module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}