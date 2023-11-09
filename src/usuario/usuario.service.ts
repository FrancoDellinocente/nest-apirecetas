import { Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from './schema/usuario.schema';
import { Model } from 'mongoose';

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
  ): Promise<Usuario> {
    const usuarioActu = await this.usuarioModule.findByIdAndUpdate(
      id,
      updateUsuarioDto,
      { new: true },
    );
    return usuarioActu;
  }

  async remove(id: string) {
    const usuarioEliminado = await this.usuarioModule.findByIdAndDelete(id);
    return usuarioEliminado;
  }
}
