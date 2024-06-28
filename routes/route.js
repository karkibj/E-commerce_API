const express=require('express');
const router=express.Router();
const {addProduct,
    removeProduct
}=require('../controllers/products');
const {displayProduct,
    placeOrder
}=require('../controllers/user');

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
router.patch('/home/order/:id/:quantity', placeOrder);


router.post('/admin',addProduct);
router.delete('/admin/delete/:id',removeProduct);
module.exports=router;