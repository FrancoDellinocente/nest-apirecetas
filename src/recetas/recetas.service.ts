import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Receta, RecetaDocument } from './schema/recetas.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import requestWithUser from 'src/interface/interface';

@Injectable()
export class RecetasService {
  constructor(
    @InjectModel(Receta.name) private recetaModule: Model<RecetaDocument>,
  ) {}

  async create(
    createRecetaDto: CreateRecetaDto,
    req: Request & requestWithUser,
  ): Promise<Receta> {
    const usuarioid = req.user.userId;

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

  async findOne(id: string): Promise<Receta> {
    const recetaId = await this.recetaModule.findById(id);
    return recetaId;
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
