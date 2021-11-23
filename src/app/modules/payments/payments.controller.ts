import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {ApiTags, ApiBody} from '@nestjs/swagger';
 
@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBody({type: CreatePaymentDto})
  @Post()
  async create(@Res() res, @Body() createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentsService.createPayment(createPaymentDto)
    return res.status(HttpStatus.OK).json({
        message: 'Create payment successfully',
        data: payment,
    })
  }

  @Get()
  async findAll(@Res() res) {
    const payment = await this.paymentsService.listPayment()
    return res.status(HttpStatus.OK).json({
      message: 'List payment successfully',
      data: payment
    })
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') paymentId: string) {
    const payment = await this.paymentsService.getPayment(paymentId);
    return res.status(HttpStatus.OK).json({
      message: 'Get payment successfully',
      data: payment
    })
  }

  @ApiBody({type: CreatePaymentDto})
  @Patch(':id')
  async update(@Res() res, @Param('id') paymentId: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentsService.updatePayment(paymentId, updatePaymentDto);
    return res.status(HttpStatus.OK).json({
      message: 'Update payment successful',
      data: payment
    })
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') paymentId: string) {
    const payment = await this.paymentsService.removePayment(paymentId);
    return res.status(HttpStatus.OK).json({
      message: 'Delete payment successfully',
      data: payment
    })
  }
}
