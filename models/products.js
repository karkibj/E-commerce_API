const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    Name:{
        type:String,
        require:true,

    },
    Price:{
        type:Number,
        require:true,
    },
    Stock:{
        type:Number,
        require:true,
        
    }
})

const Product=mongoose.model("product_info",productSchema);

module.exports=Product;