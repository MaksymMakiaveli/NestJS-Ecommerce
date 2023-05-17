import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtRequestType } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
    bufferLogs: true,
  });

  app.setGlobalPrefix('api-v1');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            errors: [...Object.values(error.constraints)],
          })),
        );
      },
    }),
  );

  // app.useGlobalFilters(new GlobalExceptionFilter());
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // --------------- Swagger init
  const swagger = new DocumentBuilder()
    .setTitle('Cloud Storage API')
    .setDescription('This service was build using NestJS')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      JwtRequestType.auth,
    )
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api-v1/swagger', app, document);

  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST || '0.0.0.0';

  await app.listen(port, host, () => {
    console.log(`App listening on port ${port} and host ${host}`);
  });
}

bootstrap();
