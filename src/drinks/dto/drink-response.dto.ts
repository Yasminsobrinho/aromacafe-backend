import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Formato de uma bebida na resposta (campos em inglês, como o Angular lê)
export class DrinkDto {
  @ApiProperty({ example: '664f1c2e8a1b2c3d4e5f6a7c' })
  id: string;

  @ApiProperty({ example: 'Latte' })
  name: string;

  @ApiProperty({
    enum: ['hot', 'cold'],
    description: 'hot = quente, cold = gelada',
  })
  type: string;

  @ApiProperty({ example: 4 })
  price: number;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'lattedebaunilha.jpg' })
  image?: string;
}

export class ListaDrinksDto {
  @ApiProperty({ example: 7 })
  total: number;

  @ApiProperty({ type: [DrinkDto] })
  data: DrinkDto[];
}
