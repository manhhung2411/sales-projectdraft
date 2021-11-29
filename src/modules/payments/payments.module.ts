import { forwardRef, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModelName, PaymentSchema } from './schema/payment.schema';
import { OrderModelName, OrderSchema } from '~/modules/orders/schema/order.schema';
import { OrdersModule } from '~/modules/orders/orders.module';

@Module({
  imports: [
    forwardRef(() => OrdersModule),
    MongooseModule.forFeature([{
      name: PaymentModelName,
      schema: PaymentSchema
    },{
      name: OrderModelName,
      schema: OrderSchema
    } ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService]
})
export class PaymentsModule {}
