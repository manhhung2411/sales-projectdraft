import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import  config  from 'config';
import { AppController } from '~/app/app.controller';
import { AppService } from '~/app/app.service';
import { OrdersModule } from '~/modules/orders/orders.module';
import { PaymentsModule } from '~/modules/payments/payments.module';
import { LoggerMiddleware } from '../utils/logger';

@Module({
  imports: [
    MongooseModule.forRoot(config.get<string>('mongodb')),
    forwardRef(() => PaymentsModule),
    forwardRef(() => OrdersModule),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ], 
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
