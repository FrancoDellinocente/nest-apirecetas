import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateIngredienteDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  nombre: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  recetas: Types.ObjectId[];
}
