const mongoose=require('mongoose');
const Product=require('../models/products');


async function addProduct(req,res){
    const body=req.body
    // middleware
    // jwt - cookies
    //  res.cookies("acces", token)

    // using middlware  verfyjwt() -> admin


    


    const {Name,Price,Stock} = req.body;

    // if(!Name && !Price){
    //     throw new Error(400, "msg")
    // }

    // items.some(item => item === "" || item?.trim() === undefined);
    
    

    await Product.create({
        Name:Name,
        Price:Price,
        Stock:Stock
        // owner: admin._id
       
    })
    return res.status(200).json({"Message":"Successfull"})
}
async function removeProduct(req,res){
    const {id}=req.params;

    const deletedproduct = await Product.findByIdAndDelete(id)

    // deletedproduct.owner == req.user._id

    if(!deletedproduct){
        return res.status(200).json({"Message":"Product now found "});
    }
    return res.status(200).json({"Message":"Product deleted successfully"});


}


module.exports={
    addProduct,
    removeProduct,
}