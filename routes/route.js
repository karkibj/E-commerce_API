const express=require('express');
const router=express.Router();
const {addProduct}=require('../controllers/products')

// router.get('/',displayProduct);
// router.patch('/',placeOrder);
router.post('/',addProduct);
// router.delete('/',removeProduct);

module.exports=router;