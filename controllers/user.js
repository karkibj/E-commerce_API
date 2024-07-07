const mongoose = require('mongoose');
const Product = require('../models/products');
const Order = require('../models/order');
const User=require('../models/user');
const bcrypt=require("bcrypt");

async function displayProduct(req, res) {
    productData = await Product.find({});
    return res.status(200).json(productData);
    // return res.render('home',{
    //     product_data:productData
    // })

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

// const loginUser=async(req,res){
    
//     const {email,password}=req.body;
//     const getUser=User.find();
// }
const createUser=async (req,res)=>{
    try{
    const {name,email,password,phone}=req.body;

    const salt = bcrypt.genSaltSync(10)
    const hashedPw = bcrypt.hashSync(password,salt)
    console.log(hashedPw)
    const isExist=await User.findOne({email})
    if(isExist){
        return res.status(401).json({success:false,"message":"Email already exists"})
    }
   
    const user = await User.create({
        Name:name,
        email:email,
        Phone:phone,
        password:hashedPw
    })
    if(!user){
        return res.status(400).json({success:false, "message": "Error while creating user."})
    }
    return res.status(201).json({"message":"Your account has been created!", user });
}
catch(err){
    console.log(err)
    return res.status(404).json({"Error":err.message})
}
}
const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        
        const userData=await User.findOne({email});
        if(!userData){
            return res.status(401).json({success:false,"message":"Email not registered"});
        }
        console.log(userData);
        const checkPw=bcrypt.compareSync(password,userData.password);
        if(!checkPw){
            return res.status(401).json({success:false,"message":"Incorrect password!"})
        }

        return res.status(200).json({sucess:true,"message":"Login Successfull!",userData});

    }
    catch(err){
        return res.status(401).json({"Error":err.message});
        console.log(err)
    }


}

// const hashingPw= async (pw)=>{
//     const hash=await bcrypt.hash(pw,10);
//     return hash;
// }

module.exports = {
    displayProduct,
    placeOrder,
    createUser,
    loginUser,
}

