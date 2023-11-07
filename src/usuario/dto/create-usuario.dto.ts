import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  @IsEmail()
  mail: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  contraseña: string;

  @IsString()
  imgPerfil: string;
}
