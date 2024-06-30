const { MaxKey, MinKey } = require('mongodb');
const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    Name:{
        type:String,
        require:[true,"Name is required"]

    },
    email:{
        type:String,
        require:[true,"Email is required"],
        unique:[true,"Email already taken"]
    },
    Phone:{
        type:Number,
        require:[true,"Phone is required"],
    },
    password:{
        type:String,
        require:[true,"Password is required"],
  
    }




})

const User=mongoose.model("user_info",UserSchema);

module.exports=User;