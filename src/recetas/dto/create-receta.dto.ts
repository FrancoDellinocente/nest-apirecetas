import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class IngredienteDto {
  @IsNotEmpty()
  @IsMongoId()
  ingrediente: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsString()
  unidad: string;
}

export class CreateRecetaDto {
  @ApiProperty({ title: 'nombre', minLength: 1, maxLength: 800 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 4000)
  descripcion: string;

  @IsString()
  imgReceta: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  ingredientes: IngredienteDto[];
}
