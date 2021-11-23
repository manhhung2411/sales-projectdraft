import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import  config  from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './app/modules/orders/orders.module';
import { PaymentsModule } from './app/modules/payments/payments.module';
import { LoggerMiddleware } from './utils/logger';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.get<string>('mongodb')),
    OrdersModule,
    PaymentsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
