import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import  config  from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from '../modules/orders/orders.module';
import { PaymentsModule } from '../modules/payments/payments.module';
import { LoggerMiddleware } from '../utils/logger';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../modules/auth/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot(config.get<string>('mongodb')),
    OrdersModule,
    PaymentsModule,
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
