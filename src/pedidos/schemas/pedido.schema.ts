import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Pedido {
  @Prop({ required: true, unique: true })
  numero: number;

  @Prop({ type: Object, required: true })
  cliente: {
    nome: string;
    email: string;
    telefone: string;
    cep?: string;
    endereco: string;
    numero: string;
    bairro: string;
    complemento?: string;
  };

  @Prop({
    type: [{ nome: String, preco: Number, quantidade: Number }],
    required: true,
  })
  itens: { nome: string; preco: number; quantidade: number }[];

  @Prop({ required: true })
  formaPagamento: string;

  @Prop()
  tipoCartao?: string;

  @Prop()
  valorTroco?: number;

  @Prop({ required: true })
  subtotal: number;

  @Prop({ default: 0 })
  desconto: number;

  @Prop({ required: true })
  total: number;

  @Prop({
    default: 'recebido',
    enum: ['recebido', 'preparando', 'entregue', 'cancelado'],
  })
  status: string;
}

export type PedidoDocument = HydratedDocument<Pedido>;
export const PedidoSchema = SchemaFactory.createForClass(Pedido);
