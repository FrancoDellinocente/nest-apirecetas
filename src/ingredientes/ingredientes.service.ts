import { Injectable } from '@nestjs/common';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingrediente, IngredienteDocument } from './schema/ingredientes.schema';

@Injectable()
export class IngredientesService {
  constructor(
    @InjectModel(Ingrediente.name)
    private ingredienteModule: Model<IngredienteDocument>,
  ) {}

  async create(
    createIngredienteDto: CreateIngredienteDto,
  ): Promise<Ingrediente> {
    const ingredienteCreado =
      await this.ingredienteModule.create(createIngredienteDto);
    return ingredienteCreado;
  }

  async findAll(): Promise<Ingrediente[]> {
    const listIngredientes = await this.ingredienteModule.find({});
    return listIngredientes;
  }

  async findOne(id: string): Promise<Ingrediente> {
    const ingredienteId = await this.ingredienteModule.findById(id);
    return ingredienteId;
  }

  async update(
    id: string,
    updateIngredienteDto: UpdateIngredienteDto,
  ): Promise<Ingrediente> {
    const ingredienteActu = await this.ingredienteModule.findByIdAndUpdate(
      id,
      updateIngredienteDto,
      { new: true },
    );
    return ingredienteActu;
  }

  async remove(id: string) {
    const ingredienteEliminado =
      await this.ingredienteModule.findByIdAndDelete(id);
    return ingredienteEliminado;
  }
}
