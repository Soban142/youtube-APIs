import User from "../model/User.js"
import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import { createError } from "../middleware/error.js"
import jwt from "jsonwebtoken"

const signup = async (req, res, next) => {
    console.log(req.body)

    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPwd = bcrypt.hashSync(req.body.password, salt)
        const newUser = await User.create({
            ...req.body, password: hashedPwd
        })
        res.status(201).send('user has been created')
    } catch (error) {
        next(error)
    }
}

const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name })
        if(!user) return next(createError(404, "User not found!"))

        const matchedPassword = await bcrypt.compare(req.body.password, user.password)
        if(!matchedPassword) return next(createError(400, "Wrong credentials"))

        const token = jwt.sign({id: user._id},  process.env.JWT)
        const { password, ...others } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)

    } catch (error) {
        next(error)
    }
}

export {
    signup,
    signin
}