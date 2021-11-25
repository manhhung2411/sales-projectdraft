import { IsNotEmpty } from "class-validator";


export class UpdatePaymentDto {
    @IsNotEmpty()
    orderId!: string;

    @IsNotEmpty()
    status!: string;
}