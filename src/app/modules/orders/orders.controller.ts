import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CreateOrderDto, GetOrderQuery, OrderDocument } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBody({type: CreateOrderDto})
  @Post()
  async create(@Res() res, @Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.createOrder(createOrderDto);
    return res.status(HttpStatus.OK).json({
      message: 'Create order successfully',
      data: order,
    })``
  }

  @Get()
  async findAll(@Res() res, @Query() getOrderQuery: GetOrderQuery) {
    const order = await this.ordersService.listOrder(getOrderQuery);
    return res.status(HttpStatus.OK).json({
      message: 'List all Orders successfully',
      data: order,
    })
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') orderId: string) {
    const order = await this.ordersService.getOrder(orderId);
    if(!order) throw new NotFoundException ('Order not existed');
    return res.status(HttpStatus.OK).json({
      message: 'Get order successfully',
      data: order,
    })
  }

  @ApiBody({type: CreateOrderDto})
  @Patch(':id')
  async update(@Res() res, @Param('id') OrderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    const order =  this.ordersService.updateOrder(OrderId, updateOrderDto);
    return res.status(HttpStatus.OK).json({
        message: 'Update order successfully',
        data: order,
    })
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') orderId: string) {
    const order = await this.ordersService.removeOrder(orderId);
    return res.status(HttpStatus.OK).json({
      message: 'Delete Order successfully',
      data: order
    })
  }
}
