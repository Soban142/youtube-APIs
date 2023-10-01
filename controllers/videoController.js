import { createError } from "../middleware/error.js"
import User from "../model/User.js"
import Video from "../model/Video.js"

const createVideo = async (req,res,next) => {
    try {
        const newVideo = await Video.create({
            userId: req.user.id,
            ...req.body
        })
        res.status(200).json(newVideo)
    } catch (error) {
        next(error)
    }
    
}
const deleteVideo = async (req,res,next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "video not found"))
        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("Video deleted!")   
        } else{
            return createError(403,'You can delete only your videos')
        }
    } catch (error) {
        next(error)
    }
}


const getVideo = async (req,res,next) => {
    try {
        const video = await Video.findById(req.params.id)
    } catch (error) {
        next(error)
    }
}


const updateVideo = async (req,res,next) => {
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

const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc : { views: 1 }
        })
        res.status.json("The view has been increased")
    } catch (error) {
        next(error)
    }
}
const randomVideos = async (req, res, next) => {
    try {
        const videos= await Video.aggregate([{$sample: { size: 40 }}])
        res.status.json(videos )
    } catch (error) {
        next(error)
    }
}
const trendVideos = async (req, res, next) => {
    try {
        const videos= await Video.find().sort({ views: -1 })
        res.status.json(videos)
    } catch (error) {
        next(error)
    }
}

const subscribedVideos = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscriptions

        const list = await Promise.all(
            subscribedChannels.map((channel) => {
                return Video.find({ userId: channel })
            })
        )


        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}


const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos= await Video.find({
            title: { $regex: query, $options: 'i' }
        }).limit(40)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}


const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(',')
    try {
        const videos= await Video.find({ tags: { $in: tags } }).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}


export {
    createVideo,
    updateVideo,
    deleteVideo,
    getVideo,
    addView,
    randomVideos,
    trendVideos,
    subscribedVideos,
    search,
    getByTag
}