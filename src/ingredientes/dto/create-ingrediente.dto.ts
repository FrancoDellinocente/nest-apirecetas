import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateIngredienteDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  nombre: string;
}
