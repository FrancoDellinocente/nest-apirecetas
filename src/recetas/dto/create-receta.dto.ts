import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Types } from 'mongoose';

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

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  ingredientes: Types.ObjectId[];
}
