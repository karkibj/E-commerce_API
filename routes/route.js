const express=require('express');
const router=express.Router();
const {addProduct,
    removeProduct
}=require('../controllers/products');
const {displayProduct,
    placeOrder
}=require('../controllers/user');

router.get('/',displayProduct);
router.patch('/order/:id/:quantity',placeOrder);
router.post('/admin',addProduct);
router.delete('/admin/delete/:id',removeProduct);
module.exports=router;