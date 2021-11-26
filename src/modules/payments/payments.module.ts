import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModelName, PaymentSchema } from './schema/payment.schema';
import { OrderModelName, OrderSchema } from '../orders/schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: PaymentModelName,
      schema: PaymentSchema
    },{
      name: OrderModelName,
      schema: OrderSchema
    } ])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
