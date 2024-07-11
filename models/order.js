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
        },
        OrderedDate:{
            type:Date
            
        }   
    })

const Order=mongoose.model("order_info",OrderSchema);

module.exports=Order;

// agragiton and pouplate  
