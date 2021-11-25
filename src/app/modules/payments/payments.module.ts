import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModelName, PaymentSchema } from './schema/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: PaymentModelName,
      schema: PaymentSchema
    }])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
