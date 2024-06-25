const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    Name:{
        type:String,
        require:true,

    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    Phone:{
        type:Number,
        require:true,
    }




})

const User=mongoose.model("user_info",UserSchema);

module.exports=User;