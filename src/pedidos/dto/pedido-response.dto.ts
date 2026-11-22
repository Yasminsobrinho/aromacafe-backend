import { ApiProperty } from '@nestjs/swagger';

// Resposta do checkout: o Angular mostra estes dados na tela de confirmação
export class PedidoCriadoDto {
  @ApiProperty({ example: 10001 })
  numero: number;

  @ApiProperty({ example: 14 })
  total: number;

  @ApiProperty({ example: 0 })
  desconto: number;
}
