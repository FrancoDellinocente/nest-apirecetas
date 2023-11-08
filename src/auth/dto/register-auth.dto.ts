import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 800)
  apellido: string;

  @IsString()
  imgPerfil: string;
}
