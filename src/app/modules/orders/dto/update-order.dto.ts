import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderDto {
    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true, unique: true})
    productName: string;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true})
    category!: string;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true})
    unitPrice!: string;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true})
    currency!: string;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true})
    quantity!: number;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true})
    total!: number;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true})
    status!: string;


    @ApiProperty()
    @Prop({type: 'date', required: true})
    createdAt!: Date;

    @ApiProperty()
    @Prop({type: 'date', required: true})
    updatedAt!: Date;
}