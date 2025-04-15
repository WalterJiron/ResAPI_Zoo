import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { HabitatContinenteService } from './habitat-continente.service';
import { CreateHabitatContinenteDto } from './dto/create-habitat-continente.dto';
import { UpdateHabitatContinenteDto } from './dto/update-habitat-continente.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('habitat-continente')
export class HabitatContinenteController {
  constructor(private readonly habitatContinenteService: HabitatContinenteService) {}

  @Auth(Role.Admin)
  @Post()
  create(@Body() createHabitatContinenteDto: CreateHabitatContinenteDto) {
    return this.habitatContinenteService.create(createHabitatContinenteDto);
  }

  @Auth(Role.Admin)
  @Get()
  findAll() {
    return this.habitatContinenteService.findAll();
  }

  @Auth(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitatContinenteService.findOne(id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitatContinenteDto: UpdateHabitatContinenteDto) {
    return this.habitatContinenteService.update(id, updateHabitatContinenteDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitatContinenteService.remove(id);
  }

  @Auth(Role.Admin)
  @Put('/activate/:id')
  restore(@Param('id') id: string) {
    return this.habitatContinenteService.restore(id);
  }
}
