import { Document } from 'mongoose';

export interface Order extends Document {
    readonly productName: string,
    readonly category: string,
    readonly unitPrice: string,
    readonly currency: string,
    readonly quantity: number,
    readonly total: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
};