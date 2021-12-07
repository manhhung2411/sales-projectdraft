import { IsEmail, IsNotEmpty } from "class-validator";
import { Status } from "~/modules/enum/status.enum";

export class CreateUserDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    address!: string;

    @IsNotEmpty()
    phone!: number;

    status?: string = Status.ACTIVE;
}