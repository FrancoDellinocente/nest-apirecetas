import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  email: string;

  @IsInt()
  @IsNotEmpty()
  age: number;
}
