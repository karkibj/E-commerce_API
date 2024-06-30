const mongoose = require('mongoose');
const Product = require('../models/products');
const Order = require('../models/order');
const User=require('../models/user');

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
        return res.json({"check":"Out of stock"});
    }
    const total_price = Number(quantity) * price;
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


const createUser=async (req,res)=>{

    const {name,email,password,phone}=req.body;
    await User.create({
        Name:name,
        email:email,
        password:password,
        Phone:phone
    })
    return res.status(201).json({"message":"Your account has been created!"});
}
module.exports = {
    displayProduct,
    placeOrder,
    createUser,
}
