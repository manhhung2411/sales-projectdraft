import { IsNotEmpty } from "class-validator";
import { Status } from "../../enum/status.enum";

export class CreateOrderDto {
    @IsNotEmpty()
    productName!: string;

    @IsNotEmpty()
    category!: string;

    @IsNotEmpty()
    unitPrice!: number;

    @IsNotEmpty()
    currency!: string;

    @IsNotEmpty()
    quantity!: number;

    @IsNotEmpty()
    total!: number;

    status?: string = Status.PENDING;
}
