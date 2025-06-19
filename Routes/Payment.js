import express from 'express'
import { checkout,userOrder,verify } from '../Controllers/Payment.js'
import { Authenticated } from '../Middleware/auth.js'
const router = express.Router();

// checkout
router.post('/checkout',checkout);

// verify-payment & save to db
router.post('/verify-payment',verify)

// user order
router.get('/userorder',Authenticated,userOrder)


export default router