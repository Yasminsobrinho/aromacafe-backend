import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dns from 'node:dns';
import { AppModule } from './app.module.js';

async function bootstrap() {
  // Ajuste de DNS para o MongoDB Atlas (mongodb+srv) resolver em qualquer rede
  dns.setServers(['1.1.1.1', '8.8.8.8']);

  const app = await NestFactory.create(AppModule);

  // Padrão das rotas: todas começam com /api (o Angular já chama /api/foods e /api/drinks)
  app.setGlobalPrefix('api');

  // CORS: libera o Angular (ng serve roda em localhost:4200)
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:4200',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // Valida os DTOs e recusa campos que não existem no contrato
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Documentação Swagger em /docs (contrato das APIs)
  const config = new DocumentBuilder()
    .setTitle('AromaCafé API')
    .setDescription('Contrato das APIs consumidas pelo frontend Angular')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
