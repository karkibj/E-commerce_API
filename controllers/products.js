const mongoose=require('mongoose');
const Product=require('../models/products');


async function addProduct(req,res){
    // const body=req.body
    const {name, age, price} = req.body;
    await Product.create({
        Name:body.Name,
        Price:body.Price,
        Stock:body.Stock
    })
    return res.status(200).json({"Message":"Successfull"})
}
async function removeProduct(req,res){
    const {id}=req.params;

    const deletedproduct = await Product.findByIdAndDelete(id)

    if(!deletedproduct){
        return res.status(200).json({"Message":"Product now found "});
    }
    return res.status(200).json({"Message":"Product deleted successfully"});


}



module.exports={
    addProduct,
    removeProduct,
}