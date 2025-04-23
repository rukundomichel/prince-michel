import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['author', 'admin'], 
            default: 'author'
        },
        createdAt: { 
            type: Date,
            default: Date.now 
        }

    }
)

export const User = mongoose.model("User", userSchema);