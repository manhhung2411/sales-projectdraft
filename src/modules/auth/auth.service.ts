import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {Observable, from} from 'rxjs';
import { Login, User, UserDocument, UserModelName } from '../users/schema/user.schema';
import * as bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { UserService } from '../users/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const SALT = 12;

@Injectable()
export class AuthService {
    constructor( private readonly jwtService: JwtService,
        
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
        ){}

    generateJwt(user: User){
        return this.jwtService.sign(user)
    }

    validateToken = (token) => jwt.verify(token, config.get<string>('TOKEN_SECRET'))

    hashPassword(password: string){
        return bcrypt.hashSync(password, SALT)
    }

    comparePasswords(password: string, storedPasswordHash:string): Observable<any>{
        return from(bcrypt.compare(password, storedPasswordHash))
    }

    async authLogin(login: Login){
        const {email, password} = login
        const user = await this.userService.findByEmail(email)
        if(!user){
            throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
        }
        if(!this.userService.validatePassword){
            throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
        }
        const accessToken = this.generateJwt(user)
        return {
            ...user,
            accessToken
        }
    }

}
