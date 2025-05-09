import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }

    }
)

export const Category = mongoose.model("Category", categorySchema);