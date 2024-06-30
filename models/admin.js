const { Timestamp } = require('mongodb');
const mongoose=require('mongoose');

const adminSchema=new mongoose.Schema({

    username:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true, 
    },
    email:{
        type:String,
        require:true,
        unique:true
    }
   
},{timestamps:true})
