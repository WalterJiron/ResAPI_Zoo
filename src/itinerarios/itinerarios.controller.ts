// src/itinerarios/itinerarios.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { ItinerariosService } from './itinerarios.service';
import { CreateItinerarioDto } from './dto/create-itinerario.dto';
import { UpdateItinerarioDto } from './dto/update-itinerario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('itinerarios')
export class ItinerariosController {
  constructor(private readonly itinerariosService: ItinerariosService) { }

  @Auth(Role.Admin)
  @Post()
  create(@Body() createItinerarioDto: CreateItinerarioDto) {
    return this.itinerariosService.create(createItinerarioDto);
  }

  @Auth(Role.Admin)
  @Get()
  findAll() {
    return this.itinerariosService.findAll();
  }

  @Auth(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itinerariosService.findOne(id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItinerarioDto: UpdateItinerarioDto) {
    return this.itinerariosService.update(id, updateItinerarioDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itinerariosService.remove(id);
  }

}