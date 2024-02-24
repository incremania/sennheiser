const  Order = require('../models/OrderModel')
const Product = require('../models/ProductModel')

const createOrder = async(req, res) => {
  try {
    const { orderItems, shippingFee} = req.body

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length < 1) {
        return res.status(400).json({ error: 'Invalid or empty order items array' });
      }
      if (typeof shippingFee !== 'number' || isNaN(shippingFee) || shippingFee <= 0) {
        return res.status(400).json({ error: 'Invalid or missing shipping fee' });
      }

    let cartItems = [];
    let subtotal = 0

    for(const item of orderItems){
        const dbProduct = await Product.findOne({ _id: item.product})
        if(!dbProduct) {
            return res.status(400).json({ error: 'no product found'})
        }
        const { name, image, price, _id} = dbProduct;

        const singleOrderItem = {
            quantity: item.quantity,
            name,
            image,
            price,
            product: _id
        }

        cartItems = [...cartItems, singleOrderItem]
        subtotal += item.quantity * price

    }



    const total = shippingFee + subtotal
    
    const order = await Order.create({
        shippingFee,
        subtotal,
        total,
        orderItems: cartItems
    })

    res.status(200).json({ order})
  } catch (error) {
   
    res.status(500).json({error})
  }

}

const getAllOrder = async(req, res) => {
    try {
      const orders = await Order.find({})
      res.status(200).json({ orders, nbHits: orders.length})  
    } catch (error) {
        res.status(500).json({error})

    }
}


const getSingleOrder = async(req, res) => {
    try {
        const { orderId } = req.params
        if(!orderId.length == 24) {
            return res.status(400).json({ error: 'invalid id'})
        }
        const order = await Order.findOne({_id: orderId});
        if(!order) {
            return res.status(404).json({ error: 'order not found'})
        }

        res.status(200).json({ order })

    } catch (error) {
        res.status(500).json({ error })
    }
}


const updateOrder = async(req, res) => {
    try {
        const { orderId } = req.params
        if(!orderId.length == 24) {
            return res.status(400).json({ error: 'invalid id'})
        }
        const order = await Order.findOne({_id: orderId});
        if(!order) {
            return res.status(404).json({ error: 'order not found'})
        }
        order.status = 'paid'
        await order.save()
        res.status(200).json({ order })
    } catch (error) {
        res.status(500).json({ error })
    }
    
}


module.exports = {
    createOrder,
    getAllOrder,
    getSingleOrder,
    updateOrder
}