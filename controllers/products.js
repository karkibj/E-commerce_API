const mongoose=require('mongoose');
const Product=require('../models/products');



async function addProduct(req,res){
    const body=req.body
    // middleware
    // jwt - cookies
    //  res.cookies("acces", token)

    // using middlware  verfyjwt() -> admin

    const {Name,Price,Stock} = req.body;

    if(!Name && !Price){
        throw new Error(400, "All field required ")
    }

    // items.some(item => item === "" || item?.trim() === undefined);
    const product=await Product.create({
        Name:Name,
        Price:Price,
        Stock:Stock
        // owner: admin._id
       
    })
    return res.status(200).json({"Message":"Successfull",product})
}
async function removeProduct(req,res){
    try{    
    const {id}=req.params;

    const deletedproduct = await Product.findByIdAndDelete(id)

    // deletedproduct.owner == req.user._id

    if(!deletedproduct){
        return res.status(200).json({"Message":"Product now found "});
    }
    return res.status(200).json({"Message":"Product deleted successfully"});
}
catch(err){
    console.log(err)
    return res.status(404).json({error:err.message});
}

}

module.exports={
    addProduct,
    removeProduct,
}


//Registration process
// --users are created by Admin
// --same for all user/ml/courseleader/ only role is difference
// --
//
