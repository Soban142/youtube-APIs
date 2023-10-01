import express from 'express'
import { getUser, unSubscribe, updateUser, deleteUser, subscribe, like, dislike } from '../controllers/userController.js'
import { createError } from '../middleware/error.js'
import { verifyToken } from '../middleware/verifyJwt.js'



const userRouter = express.Router()

userRouter.route('/:id')
    .put( verifyToken, updateUser )
    .delete( verifyToken, deleteUser )

userRouter.get('/find/:id', getUser)
userRouter.put('/sub/:id', verifyToken, subscribe)
userRouter.put('/unsub/:id', verifyToken, unSubscribe)
userRouter.put('/like/:videoId', verifyToken, like)
userRouter.put('/dislike/:videoId', verifyToken, dislike)

export default userRouter