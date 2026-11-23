
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PedidosController } from './pedidos.controller.js';
import { PedidosService } from './pedidos.service.js';
import { Pedido, PedidoSchema } from './schemas/pedido.schema.js';

import { Food, FoodSchema } from '../foods/schemas/food.schema.js';
import { Drink, DrinkSchema } from '../drinks/schemas/drink.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pedido.name, schema: PedidoSchema },
      { name: Food.name, schema: FoodSchema },
      { name: Drink.name, schema: DrinkSchema },
    ]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService],
})
export class PedidosModule {}
