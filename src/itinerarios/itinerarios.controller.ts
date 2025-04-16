// src/itinerarios/itinerarios.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { ItinerariosService } from './itinerarios.service';
import { CreateItinerarioDto } from './dto/create-itinerario.dto';
import { UpdateItinerarioDto } from './dto/update-itinerario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Auth(Role.Admin)
@Controller('itinerarios')
export class ItinerariosController {
  constructor(private readonly itinerariosService: ItinerariosService) { }

  @Post()
  create(@Body() createItinerarioDto: CreateItinerarioDto) {
    return this.itinerariosService.create(createItinerarioDto);
  }

  @Get()
  findAll() {
    return this.itinerariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itinerariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItinerarioDto: UpdateItinerarioDto) {
    return this.itinerariosService.update(id, updateItinerarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itinerariosService.remove(id);
  }

}