import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type RecetaDocument = Receta & Document;

@Schema()
export class Receta {
  @ApiProperty({ title: 'nombre' })
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  usuarioid: Types.ObjectId;

  @Prop()
  imgReceta: string;

  @Prop([
    {
      ingrediente: { type: Types.ObjectId, ref: 'Ingrediente', required: true },
      cantidad: { type: Number, required: true },
      unidad: { type: String, required: true },
    },
  ])
  ingredientes: {
    ingrediente: Types.ObjectId;
    cantidad: number;
    unidad: string;
  }[];
}

export const RecetaSchema = SchemaFactory.createForClass(Receta);
