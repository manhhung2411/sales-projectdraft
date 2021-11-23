import { Prop } from "@nestjs/mongoose";
import {ApiProperty} from '@nestjs/swagger';
import { ObjectId } from "mongoose";


export class UpdatePaymentDto {
    @ApiProperty()
    @Prop({type: 'id', required: true})
    order_ID: ObjectId;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true})
    status: string;

    @ApiProperty()
    @Prop({type: 'date', required: true})
    createdAt: Date;
    
    @ApiProperty()
    @Prop({type: 'date', required: true})
    updatedAt: Date;
    
}