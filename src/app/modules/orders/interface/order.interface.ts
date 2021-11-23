import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface Order extends Document {
    readonly productName: string;
    readonly category: string;
    readonly unitPrice: string,
    readonly quantity: number,
    readonly total: number,
    readonly status: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
};