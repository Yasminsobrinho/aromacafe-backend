import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

@Schema()
export class Food {
  @Prop({ required: true, enum: ['salgados', 'doces'] })
  categoria: string;

  @Prop({ required: true, trim: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true, min: 0 })
  preco: number;

  // O frontend usa texto, ex.: '16,99' ou ''
  @Prop({ default: '' })
  precoAntigo: string;

  // Nome do arquivo na pasta public do Angular, ex.: 'brownie.jpg'
  @Prop({ required: true })
  imagem: string;
}

export type FoodDocument = HydratedDocument<Food>;
export const FoodSchema = SchemaFactory.createForClass(Food);

// O Angular espera "id" (e não "_id") na resposta
FoodSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, ...result } = ret;
    return Object.assign(result, { id: String(_id) });
  },
});
