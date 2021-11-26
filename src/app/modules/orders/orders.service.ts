import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, GetOrderQuery, OrderModelName, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModelName)
    private readonly orderModel: Model<OrderDocument>,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto, productName: string): Promise<Order> {
    const order = await this.orderModel.findOne({ productName })
    console.log(productName);
    if(order){
      throw new HttpException('ORDER_EXISTED', HttpStatus.BAD_REQUEST)
    }
    console.log(order)
    const createOrder = await this.orderModel.create(createOrderDto); 
    return createOrder
  }

  async listOrder(getOrderQuery: GetOrderQuery): Promise<Order[]> {
    const {productName, category, currency} = getOrderQuery
    return this.orderModel.find(getOrderQuery);
  }

  async getOrder(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    if(!order){
      throw new NotFoundException('ORDER_NOT_EXISTED');
    }
      return order
  }

  // async findByName({productName: productName}): Promise<Order> {
  //   const order = await this.orderModel.findOne({productName:productName});
  //   console.log(productName)
  //   if(order) {
  //     throw new BadRequestException('ORDER_EXISTED');
  //   }
  //   return order
  // }

  async updateOrder(orderId: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.getOrder(orderId)
    await this.orderModel.findByIdAndUpdate(order._id, updateOrderDto );
    return this.getOrder(order._id);
  }

  async removeOrder(orderId: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(orderId);
  }
}
