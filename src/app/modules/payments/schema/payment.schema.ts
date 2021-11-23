import { Schema } from "mongoose";
import { ObjectId } from "mongoose";
export const  PaymentSchema = new Schema ({
    status: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: false,
    }); 
    

