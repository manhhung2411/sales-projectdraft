import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiBody, ApiTags,  } from '@nestjs/swagger';
import {GetOrderQuery, Order } from './schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '~/app/auth/guards/auth.guard';
@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBody({ type: Order })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, productName: string): Promise<Order>{
    return this.ordersService.createOrder(createOrderDto, productName);
  }

  @Get()
  async findAll(@Query() getOrderQuery: GetOrderQuery): Promise<Order[]>{
    return this.ordersService.listOrder(getOrderQuery)
  }

  @Get(':id')
  async findOne(@Param('id') orderId: string) : Promise<Order>{
    return this.ordersService.getOrder(orderId)
  }

  @ApiBody({ type: Order })
  @Patch(':id')
  async update(@Param('id') orderId: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order>{
    return this.ordersService.updateOrder(orderId, updateOrderDto)
  }

  @Delete(':id')
  async remove(@Param('id') orderId: string): Promise<Order>{
    return this.ordersService.removeOrder(orderId)
  }
}
