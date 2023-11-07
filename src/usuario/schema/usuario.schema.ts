import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true })
  mail: string;

  @Prop({ required: true })
  contraseña: string;

  @Prop()
  imgPerfil: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
