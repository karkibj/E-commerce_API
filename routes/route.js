const express=require('express');
const router=express.Router();
const {addProduct,
    removeProduct
}=require('../controllers/products');

const {displayProduct,
    placeOrder,
    createUser,
    loginUser,
}=require('../controllers/user');

const {jwtAuth}=require('../middlewares/jwtAuth')
/**
 * @swagger
 * /home:
 *   get:
 *     summary: Retrieve the home page with product data
 *     responses:
 *       200:
 *         description: Successfully retrieved the home page with product data
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal Server Error
 */
router.get('/', displayProduct);

/**
 * @swagger
 * /home/order/{id}/{quantity}:
 *   patch:
 *     summary: Order the product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to order
 *         schema:
 *           type: string
 *       - in: path
 *         name: quantity
 *         required: true
 *         description: Quantity of the product to order
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Successfully ordered the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Order successful
 *                 total_price:
 *                   type: number
 *                   example: 100.0
 *       400:
 *         description: Out of stock
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Out of stock, Stock available: 5"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */


/**
 * @swagger
 * /admin
 *     post:
 *        summary:add the product 
 *        parameters:
 *              -in 
 */
router.patch('/home/order/:id/:quantity', placeOrder);
router.post('/admin',addProduct);
router.delete('/admin/delete/:id',removeProduct);
router.post('/register',createUser);
router.post('/login',loginUser);


module.exports=router;


