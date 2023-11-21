import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Receta, RecetaDocument } from './schema/recetas.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import requestWithUser from 'src/interface/interface';
import { RecetaMinInfo } from './entities/receta.entity';
import { Usuario, UsuarioDocument } from 'src/usuario/schema/usuario.schema';

@Injectable()
export class RecetasService {
  constructor(
    @InjectModel(Receta.name) private recetaModule: Model<RecetaDocument>,
    @InjectModel(Usuario.name) private usuarioModule: Model<UsuarioDocument>,
  ) {}

  async create(
    createRecetaDto: CreateRecetaDto,
    usuarioid: Types.ObjectId,
    // req: Request & requestWithUser,
  ): Promise<Receta> {
    // const usuarioid: string = req.user.userId;

    const recetaCreado = await this.recetaModule.create({
      ...createRecetaDto,
      usuarioid,
    });

    return recetaCreado;
  }

  async findAll(): Promise<Receta[]> {
    const listRecetas = await this.recetaModule.find({});
    return listRecetas;
  }

  async findAllMinInfo(): Promise<RecetaMinInfo[]> {
    const recetas = await this.recetaModule.find();
    const recetasMinInfo: RecetaMinInfo[] = [];

    for (const receta of recetas) {
      const usuario = await this.usuarioModule.findById(receta.usuarioid);

      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const recetaMin: RecetaMinInfo = {
        recetaId: receta._id,
        recetaNombre: receta.nombre,
        imgReceta: receta.imgReceta,
        usuarioid: usuario._id,
        usuarioNombre: usuario.nombre,
        usuarioImg: usuario.imgPerfil,
      };

      recetasMinInfo.push(recetaMin);
    }

    return recetasMinInfo;
  }

  async findOne(id: string): Promise<Receta> {
    const recetaId = await this.recetaModule.findById(id);
    return recetaId;
  }

  async findOneMinInfo(id: string): Promise<RecetaMinInfo> {
    const receta = await this.recetaModule.findById(id);
    const usuario = await this.usuarioModule.findById(receta.usuarioid);

    if (!receta || !usuario) {
      throw new NotFoundException('Receta o usuario no encontrado');
    }

    const recetaMin: RecetaMinInfo = {
      recetaId: receta._id,
      recetaNombre: receta.nombre,
      imgReceta: receta.imgReceta,
      usuarioid: usuario._id,
      usuarioNombre: usuario.nombre,
      usuarioImg: usuario.imgPerfil,
    };

    return recetaMin;
  }

  async update(
    id: string,
    updateRecetaDto: UpdateRecetaDto,
    req: Request & requestWithUser,
  ): Promise<Receta> {
    const userId = req.user.userId;
    const receta: Receta = await this.recetaModule.findById(id);

    if (!receta) {
      throw new NotFoundException('Receta no encontrada');
    }

    if (receta.usuarioid !== userId) {
      throw new UnauthorizedException(
        'No tienes permiso para modificar esta receta',
      );
    }

    const recetaActu = await this.recetaModule.findByIdAndUpdate(
      id,
      updateRecetaDto,
      { new: true },
    );
    return recetaActu;
  }

  async remove(id: string, req: Request & requestWithUser) {
    const userId = req.user.userId;
    const receta: Receta = await this.recetaModule.findById(id);

    if (!receta) {
      throw new NotFoundException('Receta no encontrada');
    }

    if (receta.usuarioid !== userId) {
      throw new UnauthorizedException(
        'No tienes permiso para eliminar esta receta',
      );
    }

    const recetaEliminado = await this.recetaModule.findByIdAndDelete(id);
    return recetaEliminado;
  }
}
