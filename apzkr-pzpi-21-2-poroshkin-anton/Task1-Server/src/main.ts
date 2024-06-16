import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

const swaggerConfig = new DocumentBuilder()
  .setTitle('APZ')
  .setDescription('Hotel climate management application')
  .setVersion('1.0')
  .addTag('rooms')
  .addTag('hotels')
  .addTag('climate-profiles')
  .addTag('climate-devices')
  .addTag('clients')
  .addTag('auth')
  .addTag('companies')
  .addTag('stats')
  .addBearerAuth()
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT);
}

bootstrap();
