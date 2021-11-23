import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export const OrderModelName = 'Order';

export class CreateOrderDto {
    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true, unique: true, allowNull: true})
    productName: string;

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
    @Prop({type: 'string', required: true, trim: true})
    quantity!: number;

    @ApiProperty()
    @Prop({type: 'number', required: true, trim: true})
    total!: number;

    @ApiProperty()
    @Prop({type: 'number', required: true, trim: true})
    status!: string;

    @ApiProperty()
    @Prop({type: 'date', required: true})
    createdAt!: Date;

    @ApiProperty()
    @Prop({type: 'date', required: true})
    updatedAt!: Date;
}

// export type OrderDocument = CreateOrderDto & Document;

// export const OrderSchema = SchemaFactory.createForClass(CreateOrderDto);


export class GetOrderQuery {
    @ApiProperty()
    @IsString()
    productName: string;

    @ApiProperty()
    @IsString()
    currency: string;

    @ApiProperty()
    @IsString()
    category: string;
}
