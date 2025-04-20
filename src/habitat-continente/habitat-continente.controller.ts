import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { HabitatContinenteService } from './habitat-continente.service';
import { CreateHabitatContinenteDto } from './dto/create-habitat-continente.dto';
import { UpdateHabitatContinenteDto } from './dto/update-habitat-continente.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { DeleteRestoreCuidadorEspecieDto } from 'src/cuidador-especie/dto/delete-restore-cuidador-especie-dto';
import { DeleteRestoreHabitadContinenteDto } from './dto/delete-restore-habitad-continente-dto';

@Auth(Role.Admin)
@Controller('habitat-continente')
export class HabitatContinenteController {
  constructor(private readonly habitatContinenteService: HabitatContinenteService) {}

  @Post()
  create(@Body() createHabitatContinenteDto: CreateHabitatContinenteDto) {
    return this.habitatContinenteService.create(createHabitatContinenteDto);
  }

  @Get()
  findAll() {
    return this.habitatContinenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitatContinenteService.findOne(id);
  }

  @Patch()
  update( @Body() updateHabitatContinenteDto: UpdateHabitatContinenteDto) {
    return this.habitatContinenteService.update( updateHabitatContinenteDto);
  }

  @Delete()
  remove(@Body() deleteHabitatContinenteDto: DeleteRestoreHabitadContinenteDto) {
    return this.habitatContinenteService.remove(deleteHabitatContinenteDto);
  }

  @Put('/activate')
  restore(@Body() restoreHabitadContinenteDto: DeleteRestoreHabitadContinenteDto) {
    return this.habitatContinenteService.restore(restoreHabitadContinenteDto);
  }
}
