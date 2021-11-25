import { IsNotEmpty } from "class-validator";
import { Status } from "../../enum/status.enum";

export class CreatePaymentDto {
    @IsNotEmpty()
    orderId!: string;

    status?: string = Status.PENDING;
}