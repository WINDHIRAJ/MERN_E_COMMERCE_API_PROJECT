import express from 'express'
import { addToCart, ClearCart, decreseProductQty, removeProductFromCart, userCart } from '../Controllers/Cart.js'

import { Authenticated } from '../Middleware/auth.js'

const router = express.Router()
// add to cart
router.post('/add',Authenticated, addToCart)

// get user cart
router.get('/user',Authenticated, userCart)
// remove product from cart
router.delete('/remove/:productId',Authenticated, removeProductFromCart)
// clear cart
router.delete('/clear',Authenticated, ClearCart)
// decrese item qty
router.post('/--qty',Authenticated,decreseProductQty)
export default router