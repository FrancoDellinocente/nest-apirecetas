import { Module } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';
import { Receta, RecetaSchema } from './schema/recetas.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from 'src/usuario/schema/usuario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Receta.name,
        schema: RecetaSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Usuario.name,
        schema: UsuarioSchema,
      },
    ]),
  ],
  controllers: [RecetasController],
  providers: [RecetasService],
})
export class RecetasModule {}
