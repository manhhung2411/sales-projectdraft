import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateOrderDto,
  GetOrderQuery,
  OrderModelName,
} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './interface/order.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModelName)
    private readonly orderModel: Model<CreateOrderDto>,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new this.orderModel(createOrderDto);
    return await order.save();
  }

  async listOrder(getOrderQuery: GetOrderQuery): Promise<Order[]> {
    const { productName, currency, category } = getOrderQuery;
    const order = await this.orderModel.find();
    return order;
  }

  async getOrder(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    return order;
  }

  async updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.orderModel.findByIdAndUpdate(
      orderId,
      updateOrderDto,
      { new: true },
    );
    return order;
  }

  async removeOrder(orderId: string): Promise<Order> {
    const order = await this.orderModel.findByIdAndDelete(orderId);
    return order;
  }
}
