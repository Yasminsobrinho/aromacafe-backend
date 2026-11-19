import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from './schemas/food.schema.js';

@Injectable()
export class FoodsService {
  constructor(@InjectModel(Food.name) private readonly foodModel: Model<Food>) {}

  // Formato exigido pelo frontend: { total, data }
  async findAll() {
    const data = await this.foodModel.find().exec();
    return { total: data.length, data };
  }

  async findByCategoria(categoria: string) {
    const data = await this.foodModel.find({ categoria }).exec();
    if (data.length === 0) {
      throw new NotFoundException('Categoria de comida não encontrada.');
    }
    return { total: data.length, data };
  }
}