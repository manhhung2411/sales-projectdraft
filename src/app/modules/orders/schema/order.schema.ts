import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "../../based/base.schema";
import { Status } from "../../enum/status.enum";

export const OrderModelName = 'Order';

@Schema({timestamps: true})
export class Order extends BaseSchema {
    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true, unique: true})
    productName!: string;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true})
    category!: string;

    @ApiProperty()
    @Prop({type: 'number', required: true, trim: true})
    unitPrice!: number;
 
    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true})
    currency!: string;

    @ApiProperty()
    @Prop({type: 'number', required: true, trim: true})
    quantity!: number;

    @ApiProperty()
    @Prop({type: 'number', required: true, trim: true})
    total!: number;

    @ApiProperty()
    @Prop({ type: 'string', required: true, trim: true, enum: Status, default: Status.PENDING })
    status: string;
}
export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);

export class GetOrderQuery {
    @ApiProperty()
    productName: string;

    @ApiProperty()
    currency: string;

    @ApiProperty()
    category: string;
}
