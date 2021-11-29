import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModelName, OrderSchema } from './schema/order.schema';
import { PaymentsModule } from '~/modules/payments/payments.module';

@Module({
  imports:[
    forwardRef(() => PaymentsModule),
    MongooseModule.forFeature([{
      name: OrderModelName, 
      schema: OrderSchema 
    }])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
