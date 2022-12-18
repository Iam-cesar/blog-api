import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const PORT = process.env.PORT || 3000;
const corsOptions: CorsOptions = {
  allowedHeaders: '*',
  maxAge: 60 * 3,
  origin: '*',
  preflightContinue: true,
  methods: '*',
  credentials: true,
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);

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
