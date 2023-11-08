import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  contraseña: string;
}
