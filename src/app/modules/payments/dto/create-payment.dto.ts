import { Prop, SchemaFactory } from "@nestjs/mongoose";
import {ApiProperty} from '@nestjs/swagger';
import { ObjectId } from "mongoose";

export const PaymentModelName = 'payment';

export class CreatePaymentDto {
    @ApiProperty()
    @Prop({type: String, required: true, trim: true})
    status: string;

    @ApiProperty()
    @Prop({type: Date, required: true})
    createdAt: Date;
    
    @ApiProperty()
    @Prop({type: Date, required: true})
    updatedAt: Date;
    
}

// export type PaymentDocument = CreatePaymentDto & Document;

// export const PaymentSchema = SchemaFactory.createForClass(CreatePaymentDto);

