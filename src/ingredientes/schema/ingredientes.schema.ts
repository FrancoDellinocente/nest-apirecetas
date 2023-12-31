import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IngredienteDocument = Ingrediente & Document;

@Schema()
export class Ingrediente {
  @Prop({ required: true })
  nombre: string;
}

export const IngredienteSchema = SchemaFactory.createForClass(Ingrediente);
