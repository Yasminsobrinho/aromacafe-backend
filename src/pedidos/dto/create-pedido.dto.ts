import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class ItemPedidoDto {
  @ApiProperty({ example: 'Brownie' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 7 })
  @IsNumber()
  @Min(0)
  preco: number;

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

  // Só o tipo do cartão. NUNCA envie número, validade ou CVV.
  @ApiPropertyOptional({ enum: ['credito', 'debito'] })
  @IsOptional()
  @IsString()
  tipoCartao?: string;

  @ApiPropertyOptional({
    description: 'Valor com que o cliente vai pagar (para troco)',
  })
  @IsOptional()
  @IsNumber()
  valorTroco?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  desconto?: number;

  @ApiProperty({ type: [ItemPedidoDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto)
  itens: ItemPedidoDto[];
}
