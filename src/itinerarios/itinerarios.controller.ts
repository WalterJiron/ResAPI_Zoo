// src/itinerarios/itinerarios.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ItinerariosService } from './itinerarios.service';
import { CreateItinerarioDto } from './dto/create-itinerario.dto';
import { UpdateItinerarioDto } from './dto/update-itinerario.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('itinerarios')
export class ItinerariosController {
  constructor(private readonly itinerariosService: ItinerariosService) { }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Post()
  create(@Body() createItinerarioDto: CreateItinerarioDto) {
    return this.itinerariosService.create(createItinerarioDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get()
  findAll() {
    return this.itinerariosService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itinerariosService.findOne(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateItinerarioDto: UpdateItinerarioDto) {
    return this.itinerariosService.update(id, updateItinerarioDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itinerariosService.remove(id);
  }

  /* Endpoints adicionales para relaciones
  @Post(':id/zonas/:zonaId')
  addZona(@Param('id') id: string, @Param('zonaId') zonaId: string) {
    return this.itinerariosService.addZona(id, zonaId);
  }

  @Delete(':id/zonas/:zonaId')
  removeZona(@Param('id') id: string, @Param('zonaId') zonaId: string) {
    return this.itinerariosService.removeZona(id, zonaId);
  }

  @Post(':id/guias/:empleadoId')
  addGuia(@Param('id') id: string, @Param('empleadoId') empleadoId: string) {
    return this.itinerariosService.addGuia(id, empleadoId);
  }

  @Delete(':id/guias/:empleadoId')
  removeGuia(@Param('id') id: string, @Param('empleadoId') empleadoId: string) {
    return this.itinerariosService.removeGuia(id, empleadoId);
  }*/
}