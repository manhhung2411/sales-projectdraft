import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModelName } from './dto/create-order.dto';
import { OrderSchema } from './schema/order.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: OrderModelName, 
      schema: OrderSchema 
    }])
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
