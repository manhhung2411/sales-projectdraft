import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment, PaymentDocument, PaymentModelName } from './schema/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(PaymentModelName)
  private readonly paymentModel: Model<PaymentDocument>
  ) {}
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment>{
    return this.paymentModel.create(createPaymentDto);
  }

  async listPayment(): Promise<Payment[]> {
    return this.paymentModel.find()
  }

  async getPayment(PaymentId: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(PaymentId);
    if(!payment){
      throw new NotFoundException('PAYMENT_NOT_EXISTED');
    }
    return payment
  }

  async updatePayment(paymentId: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.getPayment(paymentId);
    await this.paymentModel.findByIdAndUpdate(payment._id, updatePaymentDto);
    return this.getPayment(payment._id);
  }

  async removePayment(paymentId: string): Promise<Payment> {
    return this.paymentModel.findByIdAndDelete(paymentId);
  }
}
