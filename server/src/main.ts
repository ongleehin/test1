import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import NotFoundExceptionFilter from './common/exceptions/NotFoundExceptionFilter';
import ResponseAddSecurityHeaderInterceptor from './common/interceptor/ResponseAddSecurityHeaderInterceptor';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,DELETE,OPTIONS',
  });
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalInterceptors(new ResponseAddSecurityHeaderInterceptor());
  console.log('listening on port:', 3001);
  // await app.listen(3001);
  await app.listen(3001);
}
bootstrap();
