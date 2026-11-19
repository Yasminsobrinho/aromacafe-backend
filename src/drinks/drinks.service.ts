import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drink } from './schemas/drink.schema.js';

@Injectable()
export class DrinksService {
  constructor(
    @InjectModel(Drink.name) private readonly drinkModel: Model<Drink>,
  ) {}

  async findAll() {
    const data = await this.drinkModel.find().exec();
    return { total: data.length, data };
  }
}
