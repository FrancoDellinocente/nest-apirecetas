import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from './schema/usuario.schema';
import { Model } from 'mongoose';
import requestWithUser from 'src/interface/interface';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModule: Model<UsuarioDocument>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    const listUsuarios = await this.usuarioModule.find({});
    return listUsuarios;
  }

  async findOne(id: string): Promise<Usuario> {
    const usuarioId = await this.usuarioModule.findById(id);
    return usuarioId;
  }

  async update(
    id: string,
    updateUsuarioDto: UpdateUsuarioDto,
    req: Request & requestWithUser,
  ): Promise<Usuario> {
    const userId = req.user.userId;
    const usuario: Usuario = await this.usuarioModule.findById(id);

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrada');
    }

    if (usuario._id.toString() !== userId.toString()) {
      throw new UnauthorizedException(
        'No tienes permiso para modificar esta usuario',
      );
    }

    const usuarioActu = await this.usuarioModule.findByIdAndUpdate(
      id,
      updateUsuarioDto,
      { new: true },
    );
    return usuarioActu;
  }

  async remove(id: string, req: Request & requestWithUser) {
    const userId = req.user.userId;
    const usuario: Usuario = await this.usuarioModule.findById(id);

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrada');
    }

    if (usuario._id.toString() !== userId.toString()) {
      console.log(usuario._id);
      console.log(userId);
      throw new UnauthorizedException(
        'No tienes permiso para eliminar esta usuario',
      );
    }
    const usuarioEliminado = await this.usuarioModule.findByIdAndDelete(id);
    return usuarioEliminado;
  }
}
