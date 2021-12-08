import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import config from 'config';
import {Request} from 'express';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const [type, token] = req.headers.authorization.split(' ');
    return type === config.get<string>('type') && token === config.get<string>('TOKEN_SECRET');
  }
}                    