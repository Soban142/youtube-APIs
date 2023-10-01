import express from 'express'
import { signup, signin } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.route('/signup')
    .post(signup)

authRouter.route('/signin')
    .post(signin)




export default authRouter