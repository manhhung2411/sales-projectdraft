import { IsNotEmpty } from "class-validator";


export class UpdateOrderDto {
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

    @IsNotEmpty()
    status!: string;
}
