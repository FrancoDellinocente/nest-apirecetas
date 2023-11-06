import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientesModule } from './ingredientes/ingredientes.module';
import { RecetasModule } from './recetas/recetas.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    UsuarioModule,
    IngredientesModule,
    RecetasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
