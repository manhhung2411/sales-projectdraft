import { Injectable, Logger, NestMiddleware} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private Logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const {ip, method, originalUrl} = request;
        const userAgent = request.get('user-agent') || '';
        
        response.on('finish', () => {
            const {statusCode} = response;
            const contentLength = response.get('content-length');

            this.Logger.log(
                `${method} ${statusCode} ${contentLength} ${originalUrl} - ${userAgent} ${ip}`,
            );
        });
        next();
    }
}