import { IsNotEmpty } from 'class-validator';
import { Status } from '../../enum/status.enum';

export class CreatePaymentDto {
  status?: string = Status.PENDING;
}
