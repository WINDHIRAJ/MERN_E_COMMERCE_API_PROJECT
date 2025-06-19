import { Payment } from "../Models/Payment.js";
import Razorpay from 'razorpay';
import dotenv from 'dotenv'

dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.Razorpay_key_id,
  key_secret: process.env.Razorpay_key_secret
})

// console.log("Initializing Razorpay with ID:", process.env.Razorpay_key_id);

// console.log("Initializing Razorpay with ID:", process.env.Razorpay_key_secret);


// checkout
export const checkout = async (req, res) => {
  try {
    const { amount, cartItems, userShipping, userId } = req.body;
    console.log("Received body:", req.body);

    if (!amount || !cartItems || !userShipping || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      orderId: order.id,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
    });

  } catch (err) {
    console.error("Checkout Error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
};

// verify ,save to db
export const verify = async (req, res) => {
  const { orderId, paymentId, signature, amount, orderItems, userId, userShipping } = req.body

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid"

  })
  res.json({ message: "payment sucessfull....", success: true, orderConfirm })
}

// user specific order
export const userOrder = async (req, res) => {

  let userId = req.user._id.toString();
  console.log(userId)
  let orders = await Payment.find({ userId: userId }).sort({ orderDate: -1 })
  res.json(orders)
}