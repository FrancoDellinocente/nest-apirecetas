import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario extends Document {
  @Prop({ required: true })
  @ApiProperty({ title: 'nombre' })
  nombre: string;

  @ApiProperty()
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
