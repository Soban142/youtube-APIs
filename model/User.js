import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        img: {
            type: String
        },
        subscribers: {
            type: Number,
            default: 0
        },
        subscriptions: {
            type: [String]
        }
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema)
