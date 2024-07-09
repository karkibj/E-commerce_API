const mongoose = require('mongoose');
const Product = require('../models/products');
const Order = require('../models/order');
const User=require('../models/user');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

//display all the products 

const  displayProduct= async (req, res)=> {
    productData = await Product.find({});
    return res.status(200).json(productData);
}

//generating accesstoken
const generateAcesstoken=(user)=>{
    return jwt.sign({
      userId:user._id},process.env.SECRET,{'expiresIn':'1h'}
   )    
  }


//OderProduct by User
const placeOrder= async (req, res)=> {
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

//creating new user
const createUser=async (req,res)=>{
    try{
    const {name,email,password,phone}=req.body;
    const isExist=await User.findOne({email})
    if(isExist){
        return res.status(401).json({success:false,"message":"Email already exists"})

    }

    //hashing password
    const salt = bcrypt.genSaltSync(10)
    const hashedPw = bcrypt.hashSync(password,salt);

    console.log(hashedPw)

    //regex
    validation=isInSecurePassword(password)
    if(validation){
        return res.json({"message":validation})
    }
   
    //User data store in userSchema
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
        const token=generateAcesstoken(userData);
        res.cookie("accessToken",token);
        
        return res.status(200).json({sucess:true,"message":"Login Successfull!",userData});

    }
    catch(err){
        return res.status(401).json({"Error":err.message});
        console.log(err)
    }

}
const isInSecurePassword = (password) => {
    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[#@\$&]/;
    if (!lengthRegex.test(password)) {
        return "Password must be at least 8 characters long.";
    }
    if (!uppercaseRegex.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!specialCharRegex.test(password)) {
        return "Password must contain at least one special character (#, @, $, &).";
    }
    return false;
};


module.exports = {
    displayProduct,
    placeOrder,
    createUser,
    loginUser,
}

