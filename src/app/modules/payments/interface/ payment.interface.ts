import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface Payment extends Document {
    readonly orderId: ObjectId;
    readonly status: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
};