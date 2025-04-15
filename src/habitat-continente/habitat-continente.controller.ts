import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitatContinenteService } from './habitat-continente.service';
import { CreateHabitatContinenteDto } from './dto/create-habitat-continente.dto';
import { UpdateHabitatContinenteDto } from './dto/update-habitat-continente.dto';

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
    return this.habitatContinenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitatContinenteDto: UpdateHabitatContinenteDto) {
    return this.habitatContinenteService.update(+id, updateHabitatContinenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitatContinenteService.remove(+id);
  }
}
