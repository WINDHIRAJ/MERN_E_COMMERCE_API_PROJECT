import jwt from 'jsonwebtoken'
import { User } from '../Models/User.js'
export const Authenticated = async (req, res, next) => {
    const token = req.header("Auth")

    if (!token) return res.json({ message: "LOgin first" })

    const decoded = jwt.verify(token, "!@#$%^&*()")
    //   console.log(decoded) 
    const id = decoded.userId

    let user = await User.findById(id)

    if (!user) return res.json({ message: "user not exist" })

    req.user = user
    next();

}