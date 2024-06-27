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
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "admin"
    // }
})

const Product=mongoose.model("product_info",productSchema);


module.exports=Product;