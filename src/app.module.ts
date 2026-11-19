import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { FoodsModule } from './foods/foods.module.js';
import { DrinksModule } from './drinks/drinks.module.js';
import { PedidosModule } from './pedidos/pedidos.module.js';

@Module({
  imports: [
    // Lê o .env em todo o projeto
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexão com o MongoDB Atlas
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),

    // Módulos iniciais da cafeteria
    FoodsModule,
    DrinksModule,
    PedidosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
