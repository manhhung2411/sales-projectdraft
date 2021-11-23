import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto, PaymentModelName } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './interface/ payment.interface';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(PaymentModelName)
  private readonly paymentModel: Model<CreatePaymentDto>
  ) {}
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment>{
      const payment = await this.paymentModel.create({createPaymentDto});
      return payment
  }

  async listPayment(): Promise<Payment[]> {
    const payment = await this.paymentModel.find()
    return payment
  }

  async getPayment(PaymentId: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(PaymentId);
    return payment
  }

  async updatePayment(paymentId: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentModel.findByIdAndUpdate(paymentId, updatePaymentDto, {new: true});
    return payment
  }

  async removePayment(paymentId: string): Promise<Payment> {
    const payment = await this.paymentModel.findByIdAndDelete(paymentId);
    return payment
  }
}
