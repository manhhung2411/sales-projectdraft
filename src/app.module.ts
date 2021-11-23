import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import  config  from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './app/modules/orders/orders.module';
import { PaymentsModule } from './app/modules/payments/payments.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.get<string>('mongodb')),
    OrdersModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}