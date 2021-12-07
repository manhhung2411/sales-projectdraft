import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserQuery, Login, User } from './schema/user.schema';
import { UserService } from './user.service';


@ApiTags('Users') 
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor( private readonly userService: UserService){}

    @ApiBody({ type: User })
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto);
    }

    @Get()
    async findAll(@Query() getUserQuery: GetUserQuery): Promise<User[]>{
        return await this.userService.findAllUsers(getUserQuery);
    }

    @Get(':id')
    async findOne(@Param('id') userId: string): Promise<User>{
        return await this.userService.findUser(userId);
    }

    @ApiBody({ type: User })
    @Patch(':id')
    async update(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User>{
    return await this.userService.updateUser(userId, updateUserDto);
  }

    @Delete(':id')
    async delete(@Param('id') userId: string): Promise<User>{
        return await this.userService.deleteUser(userId)
    }
}
