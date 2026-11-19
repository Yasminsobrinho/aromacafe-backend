import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DrinksService } from './drinks.service.js';

@ApiTags('Drinks')
@Controller('drinks') // rota final: /api/drinks
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as bebidas' })
  findAll() {
    return this.drinksService.findAll();
  }
}
