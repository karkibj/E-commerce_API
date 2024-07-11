const mongoose = require('mongoose');
const Product = require('../models/products');
const Order = require('../models/order');
const User=require('../models/user');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


//display all the products 

const  displayProduct= async (req, res)=> {
    productData = await Product.find({});
    return res.status(200).json(productData);
}

//generating accesstoken
const generateAcesstoken=(user)=>{
    return jwt.sign({
      userId:user._id},process.env.SECRET,{'expiresIn':'10h'}
   )   
  }

  //generate refreshToken
  const generateRefreshToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
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
    const salt = bcrypt.genSaltSync(10);
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
        const acessToken=generateAcesstoken(userData);
        const refreshToken=generateRefreshToken(userData);
        

        res.cookie("accessToken",acessToken);
        res.cookie("refreshToken",refreshToken);
        
        userData.Refreshtoken=refreshToken;
        userData.save({validateBeforeSave:false});
        
        return res.status(200).json({sucess:true,"message":"Login Successfull!",userData});

    }
    catch(err){
        console.log(err)
        return res.status(401).json({"Error":err.message});
       
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

const addtoCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body; // Extract product details from request body
        const id = req.user._id; // Authenticated user ID

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { myCart: { _id: product_id, quantity } } }, 
            { new: true } // 
        );

        if (!updatedUser) {
            return res.status(400).json({ success: false, message: "Failed to add the item to the cart" });
        }

        return res.status(200).json({ message: "New product added to the cart", updatedCart: updatedUser.myCart });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};




const showCart = async (req, res) => {
    try {
      const userId = req.user._id;
  
      // Find the user and populate the 'myCart' field with details from 'product_info'
      const user = await User.findById(userId).populate('myCart._id', 'Name Price Stock');

      console.log('User:', user);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const cartItems = user.myCart;
      console.log('Cart Items:', cartItems);
  
      return res.json({ message: "Cart fetched successfully", cartItems });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while fetching the cart" });
    }
  };
  
  const deleteCart = async (req, res) => {
    try {
        const { productId } = req.body; 
        const user_id = req.user._id; 

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { $pull: { myCart: { _id: productId } } },
            { new: true } // To return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User or product not found" });
        }

        return res.status(200).json({ message: "Product removed from cart", updatedCart: updatedUser.myCart });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = {
    displayProduct,
    placeOrder,
    createUser,
    loginUser,
    addtoCart,
    showCart,
    deleteCart
}

