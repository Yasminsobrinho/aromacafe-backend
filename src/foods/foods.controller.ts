import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FoodsService } from './foods.service.js';

@ApiTags('Foods')
@Controller('foods') // rota final: /api/foods
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as comidas' })
  findAll() {
    return this.foodsService.findAll();
  }

  @Get(':categoria')
  @ApiOperation({ summary: 'Lista comidas por categoria' })
  @ApiParam({ name: 'categoria', enum: ['salgados', 'doces'] })
  findByCategoria(@Param('categoria') categoria: string) {
    return this.foodsService.findByCategoria(categoria);
  }
}
