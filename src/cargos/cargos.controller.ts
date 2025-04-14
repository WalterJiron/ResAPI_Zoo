import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CargosService } from './cargos.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('cargos')
export class CargosController {
  constructor(private readonly cargosService: CargosService) { }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Post()
  create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargosService.create(createCargoDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get()
  findAll() {
    return this.cargosService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargosService.findOne(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargosService.update(id, updateCargoDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargosService.remove(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Put('/Activate/:id')
  restore(@Param('id') id: string) {
    return this.cargosService.restore(id);
  }
}
