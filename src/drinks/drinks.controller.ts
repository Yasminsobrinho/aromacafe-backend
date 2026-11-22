import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DrinksService } from './drinks.service.js';
import { ListaDrinksDto } from './dto/drink-response.dto.js';

@ApiTags('Drinks')
@Controller('drinks') // rota final: /api/drinks
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as bebidas' })
  @ApiOkResponse({ type: ListaDrinksDto })
  findAll() {
    return this.drinksService.findAll();
  }
}
