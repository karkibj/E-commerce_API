const mongoose = require('mongoose');
const Product = require('../models/products');
const Order = require('../models/order');

async function displayProduct(req, res) {
    productData = await Product.find({});
    // return res.status(200).json(productData);
    return res.render('home',{
        product_data:productData
    })

}
async function placeOrder(req, res) {
    const { id, quantity } = req.params;

    const prodcut = await Product.findById(id)
    const price = prodcut.Price;
    const stock = prodcut.Stock;

    if (stock < Number(quantity)) {
        return res.send("Out of stock,Stock available: " + stock)
    }
    const total_price = Number(quantity) * price
    const placeOrder = await Order.create({
        product_id: id,
        quantity: Number(quantity),
        price: total_price,
        OrderedDate: Date.now()
    }
    )
    if (placeOrder) {
        prodcut.Stock = stock - quantity;
        await prodcut.save();
        return res.status(201).json({ "Status": "Order successfull", "Total price": total_price });
    }
}
module.exports = {
    displayProduct,
    placeOrder,
}
