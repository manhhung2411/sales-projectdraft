import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersModule } from '~/modules/orders/orders.module';
import { PaymentsController } from '../payments.controller';
import { PaymentsService } from '../payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => OrdersModule),
      ],
      controllers: [PaymentsController],
      providers: [PaymentsService],
    })
    .compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
});
