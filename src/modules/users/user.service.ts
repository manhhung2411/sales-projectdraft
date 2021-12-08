import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserQuery, Login, User, UserDocument, UserModelName } from './schema/user.schema';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModelName)
        private readonly userModel: Model<UserDocument>,

        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) {}
    
    async createUser(createUserDto: CreateUserDto, email:string): Promise<User> {
        const { password, ...rest} = createUserDto
        const hashPassword = this.authService.hashPassword(createUserDto.password)
        // console.log(password)
        const user = await this.userModel.find({email}).lean();
        if(!user) {
            throw new HttpException('EMAIL_EXISTED', HttpStatus.BAD_REQUEST)
        }
        return await this.userModel.create({...rest, password: hashPassword})
    }

    async findAllUsers(getUserQuery: GetUserQuery): Promise<User[]>{
        const {name, email} = getUserQuery
        return await this.userModel.find(getUserQuery)
    }
    
    async findUser(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId)
        if(!user){
            throw new NotFoundException('USER_NOT_EXISTED')
        }
        return user
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findUser(userId);
        await this.userModel.findByIdAndUpdate(user._id, updateUserDto);
        return this.findUser(user._id);
      }

    async deleteUser(userId: string): Promise<User>{
        return await this.userModel.findByIdAndDelete(userId);
    }

    async findByEmail(email: string): Promise<User>{
        return await this.userModel.findOne({email}).lean();
    }

    validatePassword(password: string, storedPasswordHash: string): Observable<boolean>{
        const user = this.authService.comparePasswords(password, storedPasswordHash)
        if(!user){
            throw new HttpException('WRONG_PASSWORD', HttpStatus.NOT_FOUND)
        }
        return user
    }
}


