import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserModelName, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        MongooseModule.forFeature([{
            name: UserModelName, 
            schema: UserSchema, 
        }])
    ],
    controllers:[UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}


