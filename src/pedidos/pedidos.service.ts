
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pedido } from './schemas/pedido.schema.js';
import { CreatePedidoDto } from './dto/create-pedido.dto.js';

import { Food } from '../foods/schemas/food.schema.js';
import { Drink } from '../drinks/schemas/drink.schema.js';

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name)
    private readonly pedidoModel: Model<Pedido>,

    @InjectModel(Food.name)
    private readonly foodModel: Model<Food>,

    @InjectModel(Drink.name)
    private readonly drinkModel: Model<Drink>,
  ) {}

  async create(dto: CreatePedidoDto) {
    const itensCalculados = [];

    for (const item of dto.itens) {
      let nome: string;
      let preco: number;

      if (item.tipo === 'food') {
        const produto = await this.foodModel
          .findById(item.produtoId)
          .exec();

        if (!produto) {
          throw new NotFoundException(
            `Comida não encontrada: ${item.produtoId}`,
          );
        }

        nome = produto.nome;
        preco = produto.preco;
      } else {
        const produto = await this.drinkModel
          .findById(item.produtoId)
          .exec();

        if (!produto) {
          throw new NotFoundException(
            `Bebida não encontrada: ${item.produtoId}`,
          );
        }

        nome = produto.name;
        preco = produto.price;
      }

      if (!Number.isFinite(preco) || preco < 0) {
        throw new BadRequestException(
          'Preço inválido no cadastro do produto.',
        );
      }

      itensCalculados.push({
        produtoId: item.produtoId,
        tipo: item.tipo,
        nome,
        preco,
        quantidade: item.quantidade,
      });
    }

    const subtotal = itensCalculados.reduce(
      (soma, item) => soma + item.preco * item.quantidade,
      0,
    );

    // Descontos serão calculados pelo backend
    // quando as regras de promoção forem implementadas.
    const desconto = 0;

    const total = subtotal - desconto;

    if (
      dto.formaPagamento === 'Dinheiro' &&
      dto.valorTroco !== undefined &&
      dto.valorTroco <= total
    ) {
      throw new BadRequestException(
        'O valor para o troco deve ser maior que o total.',
      );
    }

    const numero =
      (await this.pedidoModel.countDocuments()) + 10001;

    const pedido = await this.pedidoModel.create({
      numero,
      cliente: {
        nome: dto.nome,
        email: dto.email,
        telefone: dto.telefone,
        cep: dto.cep,
        endereco: dto.endereco,
        numero: dto.numero,
        bairro: dto.bairro,
        complemento: dto.complemento,
      },
      itens: itensCalculados,
      formaPagamento: dto.formaPagamento,
      tipoCartao: dto.tipoCartao,
      valorTroco: dto.valorTroco,
      subtotal,
      desconto,
      total,
    });

    return {
      numero: pedido.numero,
      total: pedido.total,
      desconto: pedido.desconto,
    };
  }
}
