import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from 'src/usuario/schema/usuario.schema';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModule: Model<UsuarioDocument>,
    private jwtService: JwtService,
  ) {}

  async create(registerAuthDto: RegisterAuthDto) {
    const { contraseña } = registerAuthDto;
    const plainToHash = await hash(contraseña, 10);
    registerAuthDto = { ...registerAuthDto, contraseña: plainToHash };
    const usuarioCreado = await this.usuarioModule.create(registerAuthDto);
    return usuarioCreado;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { mail, contraseña } = loginAuthDto;
    const findUsuario = await this.usuarioModule.findOne({ mail });

    if (!findUsuario) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    const checkContra = await compare(contraseña, findUsuario.contraseña);

    if (!checkContra) {
      throw new HttpException('Contraseña incorrecta', 403);
    }

    const payload = { id: findUsuario._id, nombre: findUsuario.nombre };
    const token = this.jwtService.sign(payload);

    const data = {
      usuario: findUsuario,
      token,
    };
    return data;
  }
}
