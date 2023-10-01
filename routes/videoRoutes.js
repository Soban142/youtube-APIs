import express from 'express';
import { verifyToken } from '../middleware/verifyJwt.js';
import { getVideo, createVideo, updateVideo, deleteVideo, addView, randomVideos, trendVideos, subscribedVideos, getByTag, search } from '../controllers/videoController.js'

const videoRouter = express.Router()

videoRouter.post('/', verifyToken, createVideo)
videoRouter.put('/:id', verifyToken, updateVideo)
videoRouter.delete('/:id', verifyToken, deleteVideo)
videoRouter.get('/find/:id', getVideo)
videoRouter.put('/view/:id', addView)
videoRouter.get('/random/:id', randomVideos)
videoRouter.get('/trend/:id', trendVideos)
videoRouter.get('/subs', verifyToken, subscribedVideos)
videoRouter.get('/tags', getByTag)
videoRouter.get('/search', search)

export default videoRouter