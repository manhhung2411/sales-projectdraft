import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import config from 'config';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const [type, token] = req.headers.authorization.split(' ');
    return type === config.get<string>('type') && token === config.get<string>('token');
  }
}