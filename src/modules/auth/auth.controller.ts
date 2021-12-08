import { Body, Controller, forwardRef, Inject, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Login, User, UserDocument, UserModelName } from "../users/schema/user.schema";
import { UserModule } from "../users/user.module";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";


@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    constructor( 
        private readonly authService: AuthService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ){}

    @ApiBody({ type: User })
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, email:string): Promise<User> {
        return await this.userService.createUser(createUserDto, email)
    }

    @ApiBody({ type: Login })
    @Post('login')
    async login(@Body() login: Login): Promise<User>{
        return await this.authService.authLogin(login)
    }
}