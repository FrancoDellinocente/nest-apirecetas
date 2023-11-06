import { Injectable } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Receta, RecetaDocument } from './schema/recetas.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RecetasService {
  constructor(
    @InjectModel(Receta.name) private recetaModule: Model<RecetaDocument>,
  ) {}

  async create(createRecetaDto: CreateRecetaDto): Promise<Receta> {
    const recetaCreado = await this.recetaModule.create(createRecetaDto);
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

  async update(id: string, updateRecetaDto: UpdateRecetaDto): Promise<Receta> {
    const recetaActu = await this.recetaModule.findByIdAndUpdate(
      id,
      updateRecetaDto,
      { new: true },
    );
    return recetaActu;
  }

  async remove(id: string) {
    const recetaEliminado = await this.recetaModule.findByIdAndDelete(id);
    return recetaEliminado;
  }
}
