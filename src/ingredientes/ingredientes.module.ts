import { Module } from '@nestjs/common';
import { IngredientesService } from './ingredientes.service';
import { IngredientesController } from './ingredientes.controller';
import { Ingrediente, IngredienteSchema } from './schema/ingredientes.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ingrediente.name,
        schema: IngredienteSchema,
      },
    ]),
  ],
  controllers: [IngredientesController],
  providers: [IngredientesService],
})
export class IngredientesModule {}
