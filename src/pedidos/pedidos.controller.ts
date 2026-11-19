import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PedidosService } from './pedidos.service.js';
import { CreatePedidoDto } from './dto/create-pedido.dto.js';

@ApiTags('Pedidos')
@Controller('pedidos') // rota final: /api/pedidos
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @ApiOperation({ summary: 'Finaliza um pedido (checkout)' })
  create(@Body() dto: CreatePedidoDto) {
    return this.pedidosService.create(dto);
  }
}
