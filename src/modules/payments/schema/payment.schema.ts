import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from '../../based/base.schema';
import { Status } from '../../enum/status.enum';
import { CreatePaymentDto } from '../dto/create-payment.dto';

export const PaymentModelName = 'payment';

@Schema({timestamps: true})
export class Payment extends BaseSchema {
  @ApiProperty()
  @Prop({ type: 'string', required: true, trim: true})
  orderId: string;

  @ApiProperty()
  @Prop({ type: 'string', required: true, trim: true, enum: Status, default: Status.PENDING })
  status?: string = Status.PENDING;
}

export type PaymentDocument = Payment & Document;

export const PaymentSchema = SchemaFactory.createForClass(Payment);
    

