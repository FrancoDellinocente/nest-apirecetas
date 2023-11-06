import { Module } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';
import { Receta, RecetaSchema } from './schema/recetas.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Receta.name,
        schema: RecetaSchema,
      },
    ]),
  ],
  controllers: [RecetasController],
  providers: [RecetasService],
})
export class RecetasModule {}
