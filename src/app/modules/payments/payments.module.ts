import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModelName, PaymentSchema } from './dto/create-payment.dto';

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