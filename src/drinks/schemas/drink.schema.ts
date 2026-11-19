import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

@Schema()
export class Drink {
  @Prop({ required: true, trim: true })
  name: string;

  // hot = quente, cold = gelada
  @Prop({ required: true, enum: ['hot', 'cold'] })
  type: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop()
  description?: string;

  @Prop()
  image?: string;
}

export type DrinkDocument = HydratedDocument<Drink>;
export const DrinkSchema = SchemaFactory.createForClass(Drink);

DrinkSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, ...result } = ret;
    return Object.assign(result, { id: String(_id) });
  },
});
