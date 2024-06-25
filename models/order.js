const mongoose=require('mongoose');

const OrderSchema=new mongoose.Schema({
  
        product_id:{
            type:String,
        },
        quantity:{
            type:Number
        },
        orderedBy:[]
        
    })

const User=mongoose.model("user_info",UserSchema);

module.exports=User;