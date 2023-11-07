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
import { Types } from 'mongoose';

class IngredienteDto {
  @IsNotEmpty()
  @IsString()
  ingrediente: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsString()
  unidad: string;
}

export class CreateRecetaDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 4000)
  descripcion: string;

  @IsMongoId()
  @IsNotEmpty()
  usuarioid: Types.ObjectId;

  @IsString()
  imgPerfil: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  ingredientes: IngredienteDto[];
}
