import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import requestWithUser from 'src/interface/interface';
import { RecetaMinInfo } from './entities/receta.entity';

@ApiBearerAuth()
@ApiTags('recetas')
@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createRecetaDto: CreateRecetaDto,
    @Req() req: Request & requestWithUser,
  ) {
    const usuarioid = req.user.userId;
    return this.recetasService.create(createRecetaDto, usuarioid);
  }

  @Get()
  findAll() {
    return this.recetasService.findAll();
  }

  @Get('minInfo')
  findAllMinInfo(): Promise<RecetaMinInfo[]> {
    return this.recetasService.findAllMinInfo();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.recetasService.findOne(id);
  }

  @Get(':id')
  findOneMinInfo(@Param('id') id: string) {
    return this.recetasService.findOneMinInfo(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecetaDto: UpdateRecetaDto,
    @Req() req: Request & requestWithUser,
  ) {
    return this.recetasService.update(
      id,
      updateRecetaDto,
      req as Request & requestWithUser,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & requestWithUser) {
    return this.recetasService.remove(id, req as Request & requestWithUser);
  }
}
