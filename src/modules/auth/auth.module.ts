import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from './auth.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "./guards/auth.guard";
import config from 'config';
import { AuthController } from "./auth.controller";
import { UserModule } from "../users/user.module";

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async () => ({
                secret: config.get('TOKEN_SECRET'),
                signOptions: { expiresIn: config.get('TOKEN_EXPIRE')}
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule {}