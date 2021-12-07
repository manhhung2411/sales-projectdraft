import { Body, Controller, forwardRef, Inject, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Login, User, UserDocument, UserModelName } from "../users/schema/user.schema";
import { UserModule } from "../users/user.module";
import { UserService } from "../users/user.service";


@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    constructor( 
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ){}

    @ApiBody({ type: User })
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto)
    }

    @ApiBody({ type: User })
    @Post('login')
    async login(@Body() login: Login): Promise<User>{
        return await this.login(login)
    }
}