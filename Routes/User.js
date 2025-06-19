import express from 'express'
import { login, profile, register, users } from '../Controllers/User.js'
import { Authenticated } from '../Middleware/auth.js'

const router=express.Router()

// register user

router.post('/register',register)  //=>/api/user/register

// login user'
router.post('/login',login)

// get all users
router.get('/all',users)

// get user profilr
router.get('/profile',Authenticated,profile)
export default router