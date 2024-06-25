const mongoose=require('mongoose');
const Product=require('../models/products');


async function addProduct(req,res){
    const body=req.body
    await Product.create({
        Name:body.Name,
        Price:body.Price,
        Stock:body.Stock
    })
    return res.status(200).json({"Message":"Successfull"})
}

module.exports={
    addProduct,
}