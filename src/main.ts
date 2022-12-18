import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Cors from 'cors';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    Cors({
      origin: '*',
      methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      allowedHeaders: '*',
      credentials: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('BLOG API DOC')
    .setVersion(process.env.APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(PORT);
}
bootstrap();
