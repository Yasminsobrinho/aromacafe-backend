import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health') // rota final: /api/health
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Verifica se a API está no ar' })
  @ApiOkResponse({ schema: { example: { status: 'ok' } } })
  check() {
    return { status: 'ok' };
  }
}
