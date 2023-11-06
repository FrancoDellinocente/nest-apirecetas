import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RecetaDocument = Receta & Document;

@Schema()
export class Receta {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  usuarioid: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Ingrediente' }])
  ingredientes: Types.ObjectId[];
}

export const RecetaSchema = SchemaFactory.createForClass(Receta);
