
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class ItemPedidoDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsMongoId()
  produtoId: string;

  @ApiProperty({ enum: ['food', 'drink'] })
  @IsIn(['food', 'drink'])
  tipo: 'food' | 'drink';

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  quantidade: number;
}

export class CreatePedidoDto {
  @ApiProperty({ example: 'Maria Silva' })
  @IsString()
  @MinLength(3)
  nome: string;

  @ApiProperty({ example: 'maria@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '21999998888' })
  @IsString()
  @MinLength(10)
  telefone: string;

  @ApiPropertyOptional({ example: '20040-020' })
  @IsOptional()
  @IsString()
  cep?: string;

  @ApiProperty({ example: 'Av. Rio Branco' })
  @IsString()
  @MinLength(3)
  endereco: string;

  @ApiProperty({ example: '100' })
  @IsString()
  @IsNotEmpty()
  numero: string;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  @MinLength(3)
  bairro: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  complemento?: string;

  @ApiProperty({ enum: ['Cartão', 'Dinheiro', 'Pix'] })
  @IsEnum(['Cartão', 'Dinheiro', 'Pix'])
  formaPagamento: string;

  @ApiPropertyOptional({ enum: ['credito', 'debito'] })
  @IsOptional()
  @IsIn(['credito', 'debito'])
  tipoCartao?: string;

  @ApiPropertyOptional({
    description: 'Valor com que o cliente vai pagar, para troco',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  valorTroco?: number;

  @ApiProperty({ type: [ItemPedidoDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto)
  itens: ItemPedidoDto[];
}
