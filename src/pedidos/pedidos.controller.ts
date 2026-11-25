import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PedidosService } from './pedidos.service.js';
import { CreatePedidoDto } from './dto/create-pedido.dto.js';
import { PedidoCriadoDto } from './dto/pedido-response.dto.js';

@ApiTags('Pedidos')
@Controller(['pedidos', 'orders'])
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @ApiOperation({ summary: 'Finaliza um pedido (checkout)' })
  @ApiCreatedResponse({ type: PedidoCriadoDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  create(@Body() dto: CreatePedidoDto) {
    return this.pedidosService.create(dto);
  }
}
