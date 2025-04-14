import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ZonasService } from './zonas.service';
import { CreateZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('zonas')
export class ZonasController {
  constructor(private readonly zonasService: ZonasService) { }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Post()
  async create(@Body() createZonaDto: CreateZonaDto) {
    return this.zonasService.create(createZonaDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get()
  async findAll() {
    return this.zonasService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.zonasService.findOne(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateZonaDto: UpdateZonaDto) {
    return this.zonasService.update(id, updateZonaDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.zonasService.remove(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Put('/Activate/:id')
  async restore(@Param('id') id: string) {
    return this.zonasService.restore(id);
  }
}
