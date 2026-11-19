import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido } from './schemas/pedido.schema.js';
import { CreatePedidoDto } from './dto/create-pedido.dto.js';

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name) private readonly pedidoModel: Model<Pedido>,
  ) {}

  async create(dto: CreatePedidoDto) {
    // O total é calculado aqui, e não vem do navegador
    const subtotal = dto.itens.reduce(
      (soma, i) => soma + i.preco * i.quantidade,
      0,
    );
    const desconto = dto.desconto ?? 0;
    const total = Math.max(0, subtotal - desconto);

    if (
      dto.formaPagamento === 'Dinheiro' &&
      dto.valorTroco &&
      dto.valorTroco <= total
    ) {
      throw new BadRequestException(
        'O valor para o troco deve ser maior que o total.',
      );
    }

    // Número sequencial do pedido (começa em 10001)
    const numero = (await this.pedidoModel.countDocuments()) + 10001;

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
      itens: dto.itens,
      formaPagamento: dto.formaPagamento,
      tipoCartao: dto.tipoCartao,
      valorTroco: dto.valorTroco,
      subtotal,
      desconto,
      total,
    });

    // O Angular mostra estes dados na tela de confirmação
    return {
      numero: pedido.numero,
      total: pedido.total,
      desconto: pedido.desconto,
    };
  }
}
