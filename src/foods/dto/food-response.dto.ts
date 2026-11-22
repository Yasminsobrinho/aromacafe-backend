import { ApiProperty } from '@nestjs/swagger';

// Formato de uma comida na resposta (contrato com o Angular)
export class FoodDto {
  @ApiProperty({ example: '664f1c2e8a1b2c3d4e5f6a7b' })
  id: string;

  @ApiProperty({ enum: ['salgados', 'doces'] })
  categoria: string;

  @ApiProperty({ example: 'Brownie' })
  nome: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty({ example: 7 })
  preco: number;

  @ApiProperty({
    example: '',
    description: 'Texto, ex.: "16,99", ou vazio quando não há preço antigo',
  })
  precoAntigo: string;

  @ApiProperty({
    example: 'brownie.jpg',
    description: 'Nome do arquivo na pasta public do Angular',
  })
  imagem: string;
}

// Envelope de lista usado por todo o cardápio: { total, data }
export class ListaFoodsDto {
  @ApiProperty({ example: 18 })
  total: number;

  @ApiProperty({ type: [FoodDto] })
  data: FoodDto[];
}
