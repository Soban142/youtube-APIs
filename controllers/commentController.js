import Comment from '../model/Comment.js'
import Video from '../model/Video.js'

import { createError } from "../middleware/error.js"

const addComment = async (req,res,next) => {
    try {
        const newComment = await Comment.create({
            userId: req.user.id,
            ...req.body
        })
        res.status(200).json(newComment)
    } catch (error) {
        next(error)
    }
    
}
const deleteComment = async (req,res,next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "video not found"))
        if(req.user.id === video.userId || req.user.id === comment.userId){
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment deleted!")   
        } else{
            return createError(403,'You can delete only your videos')
        }
    } catch (error) {
        next(error)
    }
}


const getComments = async (req,res,next) => {
    try {
        const comments = await Comment.find({videoId: req.params.id});
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}


const editComment = async (req,res,next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "video not found"))
        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,
               { $set: req.body },
               { new: true })

            res.status(200).json(updatedVideo)   
        } else{
            return createError(403,'You can update only your videos')
        }
    } catch (error) {
        next(error)
    }
}


export{
    addComment,
    deleteComment,
    editComment,
    getComments
}