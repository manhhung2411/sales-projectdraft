import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export const PaymentModelName = 'payment';

export class CreatePaymentDto {
  @ApiProperty()
  @Prop({ type: 'id', required: true })
  orderId: ObjectId;

  @ApiProperty()
  @Prop({ type: 'string', required: true, trim: true })
  status: string;

  @ApiProperty()
  @Prop({ type: 'date', required: true })
  createdAt: Date;

  @ApiProperty()
  @Prop({ type: 'date', required: true })
  updatedAt: Date;
}

// export type PaymentDocument = CreatePaymentDto & Document;

// export const PaymentSchema = SchemaFactory.createForClass(CreatePaymentDto);
