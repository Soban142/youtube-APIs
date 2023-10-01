// get a user

import { createError } from "../middleware/error.js"
import User from "../model/User.js"
import video from "../model/Video.js";
import Video from '../model/Video.js'

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

// update a user

const updateUser = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, 
            {new: true}) 
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    } else{
        return next(createError(403, "You can update only your account!"))
    }
}

// delete a user

const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try {
            const updatedUser = await User.findByIdAndDelete(req.params.id) 
            res.status(200).json("User has been deleted");
        } catch (error) {
            next(error)
        }
    } else{
        return next(createError(403, "You can delete only your account!"))
    }
}

// subscribe a user
const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push : { subscriptions: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc : { subscribers: 1 }
        })
        res.status(200).send("subscribed")
    } catch (error) {
        next(error)
    }
}

// unSubscribe a user
const unSubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull : { subscriptions: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc : { subscribers: -1 }
        })
        res.status(200).send("unsubscribed")
    } catch (error) {
        next(error)
    }
}


// like a video

const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.user.videoId
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {likes: id},
            $pull: {dislikes: id}
        })
        res.status(200).json("the video has been liked")
    } catch (error) {
        next(error)
    }
}

// dislike a video

const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.user.videoId
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {dislikes: id},
            $pull: {likes: id}
        })
        res.status(200).json("the video has been disliked")
    } catch (error) {
        next(error)
    }
}


export {
    getUser,
    unSubscribe,
    updateUser,
    deleteUser,
    subscribe,
    like,
    dislike
}