import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DrinksController } from './drinks.controller.js';
import { DrinksService } from './drinks.service.js';
import { Drink, DrinkSchema } from './schemas/drink.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Drink.name, schema: DrinkSchema }]),
  ],
  controllers: [DrinksController],
  providers: [DrinksService],
})
export class DrinksModule {}
