import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FoodsService } from './foods.service.js';
import { ListaFoodsDto } from './dto/food-response.dto.js';

@ApiTags('Foods')
@Controller('foods') // rota final: /api/foods
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as comidas' })
  @ApiOkResponse({ type: ListaFoodsDto })
  findAll() {
    return this.foodsService.findAll();
  }

  @Get(':categoria')
  @ApiOperation({ summary: 'Lista comidas por categoria' })
  @ApiParam({ name: 'categoria', enum: ['salgados', 'doces'] })
  @ApiOkResponse({ type: ListaFoodsDto })
  @ApiNotFoundResponse({ description: 'Categoria de comida não encontrada.' })
  findByCategoria(@Param('categoria') categoria: string) {
    return this.foodsService.findByCategoria(categoria);
  }
}
