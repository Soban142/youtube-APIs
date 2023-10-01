import express from 'express'
import { verifyToken } from '../middleware/verifyJwt.js'
import { addComment, deleteComment, editComment, getComments } from '../controllers/commentController.js'

const commentRouter = express.Router()

commentRouter.post('/', verifyToken, addComment)
commentRouter.delete('/:id', verifyToken, deleteComment)
commentRouter.get('/:videoId', verifyToken, getComments)


export default commentRouter