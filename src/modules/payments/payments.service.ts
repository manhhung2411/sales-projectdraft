import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { OrderDocument, OrderModelName } from '../orders/schema/order.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  Payment,
  PaymentDocument,
  PaymentModelName,
} from './schema/payment.schema';
import { Types } from 'mongoose';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(PaymentModelName)
    private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(OrderModelName)
    private readonly orderModel: Model<OrderDocument>,
  ) {}
  async createPayment(
    createPaymentDto: CreatePaymentDto,
    orderId: string,
  ) {
      if (!isValidObjectId(orderId)) {
        throw new HttpException('ORDER_ID_NOT_EXIST', HttpStatus.NOT_FOUND);
      }
      const order = await this.orderModel.findById(orderId);
      console.log(order);
  
      if (!order) {
        throw new HttpException('ORDER_ID_NOT_EXIST', HttpStatus.NOT_FOUND);
      }
      const createPayment = await this.paymentModel.create({
        ...createPaymentDto,
        orderId: order._id,
      });
      return createPayment;
  }

  async listPayment(): Promise<Payment[]> {
    return this.paymentModel.find();
  }

  async getPayment(PaymentId: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(PaymentId);
    if (!payment) {
      throw new NotFoundException('PAYMENT_NOT_EXISTED');
    }
    return payment;
  }

  async updatePayment(
    paymentId: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.getPayment(paymentId);
    await this.paymentModel.findByIdAndUpdate(payment._id, updatePaymentDto);
    return this.getPayment(payment._id);
  }

  async removePayment(paymentId: string): Promise<Payment> {
    return this.paymentModel.findByIdAndDelete(paymentId);
  }
}
