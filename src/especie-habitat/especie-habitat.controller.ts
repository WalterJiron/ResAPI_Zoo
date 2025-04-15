import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { EspecieHabitatService } from './especie-habitat.service';
import { CreateEspecieHabitatDto } from './dto/create-especie-habitat.dto';
import { UpdateEspecieHabitatDto } from './dto/update-especie-habitat.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('especie/habitat')
export class EspecieHabitatController {
  constructor(private readonly especieHabitatService: EspecieHabitatService) {}

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Post()
  create(@Body() createEspecieHabitatDto: CreateEspecieHabitatDto) {
    return this.especieHabitatService.create(createEspecieHabitatDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get()
  findAll() {
    return this.especieHabitatService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especieHabitatService.findOne(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecieHabitatDto: UpdateEspecieHabitatDto) {
    return this.especieHabitatService.update(id, updateEspecieHabitatDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especieHabitatService.remove(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Put('/activate/:id')
  restore(@Param('id') id: string) {
    return this.especieHabitatService.restore(id);
  }
}
