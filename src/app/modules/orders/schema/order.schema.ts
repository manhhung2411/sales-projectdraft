import { Schema } from 'mongoose';

export const  OrderSchema = new Schema({
    productName: {
        type: String, 
        unique: true,
        allowNull: true,
    },
    category: String,
    unitPrice: Number,
    currency: String,
    quantity: Number,
    total: Number,
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
