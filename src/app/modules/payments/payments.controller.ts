import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Payment } from './schema/payment.schema';
import { AuthGuard } from '~/app/auth/guards/auth.guard';

@ApiTags('Payments')
@Controller('payments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':orderId')
  @ApiBody({ type: CreatePaymentDto })
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Param('orderId') orderId: string,
  ) {
    return this.paymentsService.createPayment(createPaymentDto, orderId);
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.listPayment();
  }

  @Get(':id')
  async findOne(@Param('id') paymentId: string): Promise<Payment> {
    return this.paymentsService.getPayment(paymentId);
  }

  @ApiBody({ type: Payment })
  @Patch(':id')
  async update(
    @Param('id') paymentId: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    return this.paymentsService.updatePayment(paymentId, updatePaymentDto);
  }

  @Delete(':id')
  async remove(@Param('id') paymentId: string): Promise<Payment> {
    return this.paymentsService.removePayment(paymentId);
  }
}
