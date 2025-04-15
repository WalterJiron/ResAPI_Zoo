import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { HabitatContinenteService } from './habitat-continente.service';
import { CreateHabitatContinenteDto } from './dto/create-habitat-continente.dto';
import { UpdateHabitatContinenteDto } from './dto/update-habitat-continente.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('habitat-continente')
export class HabitatContinenteController {
  constructor(private readonly habitatContinenteService: HabitatContinenteService) {}

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Post()
  create(@Body() createHabitatContinenteDto: CreateHabitatContinenteDto) {
    return this.habitatContinenteService.create(createHabitatContinenteDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get()
  findAll() {
    return this.habitatContinenteService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitatContinenteService.findOne(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitatContinenteDto: UpdateHabitatContinenteDto) {
    return this.habitatContinenteService.update(id, updateHabitatContinenteDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitatContinenteService.remove(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Put('/activate/:id')
  restore(@Param('id') id: string) {
    return this.habitatContinenteService.restore(id);
  }
}
