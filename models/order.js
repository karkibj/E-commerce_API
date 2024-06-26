const mongoose=require('mongoose');

const OrderSchema=new mongoose.Schema({
  
        product_id:{
            type:String,
        },
        quantity:{
            type:Number
        },
        price:{
            type:Number
        }
       
        
    })

const Order=mongoose.model("order_info",OrderSchema);

module.exports=Order;