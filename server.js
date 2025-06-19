import express from 'express'
import mongoose from 'mongoose'
import userRouter from './Routes/User.js'
import bodyParser from 'express'
import productRouter from './Routes/Product.js'
import cardRouter from './Routes/Cart.js'
import addressRouter from './Routes/address.js'
import cors from 'cors'
import paymentRouter from './Routes/Payment.js'

const app = express()
app.use(bodyParser.json())

app.use(cors({
    origin:true,
    methods:["GET",'POST','PUT','DELETE'],
    credentials:true

}))

// home testing router
app.get('/', (req, res) => (
    res.json({ message: "this is home router" })
))


// user router
app.use('/api/user', userRouter)


// product router
app.use('/api/product', productRouter)

// cart router
app.use('/api/cart', cardRouter)


// address router
app.use('/api/address',addressRouter)

// payment router
app.use('/api/payment',paymentRouter)




mongoose.connect(
    "mongodb+srv://dhirajgaikwad32569:yN0NW7UgprbOCDJU@cluster0.xqswbco.mongodb.net/",
    {
        dbName: "MERN_E_COMMERCE"
    }
).then(() => console.log("MONGODB connected sucessfully......!")).catch((err) => console.log(err))


const port = 1000
app.listen(port, () => console.log(`server is rinning on ${port}`))



