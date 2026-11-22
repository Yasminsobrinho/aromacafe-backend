import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dns from 'node:dns';
import { AppModule } from './app.module.js';

async function bootstrap() {
  dns.setServers(['1.1.1.1', '8.8.8.8']);

  const app = await NestFactory.create(AppModule);

  // PadrÃ£o das rotas: o Angular jÃ¡ chama /api/foods e /api/drinks
  app.setGlobalPrefix('api');

  // CORS: libera o Angular (ng serve roda em localhost:4200)
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:4200',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // Valida os DTOs e recusa campos desconhecidos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // DocumentaÃ§Ã£o Swagger em /docs
  const config = new DocumentBuilder()
    .setTitle('AromaCafÃ© API')
    .setDescription('Contrato das APIs consumidas pelo frontend Angular')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
