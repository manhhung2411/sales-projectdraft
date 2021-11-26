import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from 'config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const blog = new DocumentBuilder()
  .setTitle('SALES')
  .setDescription('SALES API Documentation')
  .setVersion('1.0')
  .addTag('Sales')
  .build();

  const document = SwaggerModule.createDocument(app, blog);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());  

  await app.listen(config.get<number>('port'));                                         
}
bootstrap();
