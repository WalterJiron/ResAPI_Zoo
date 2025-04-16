import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { HabitatContinenteService } from './habitat-continente.service';
import { CreateHabitatContinenteDto } from './dto/create-habitat-continente.dto';
import { UpdateHabitatContinenteDto } from './dto/update-habitat-continente.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitatContinenteDto: UpdateHabitatContinenteDto) {
    return this.habitatContinenteService.update(id, updateHabitatContinenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitatContinenteService.remove(id);
  }

  @Put('/activate/:id')
  restore(@Param('id') id: string) {
    return this.habitatContinenteService.restore(id);
  }
}
