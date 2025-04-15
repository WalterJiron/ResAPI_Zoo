import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ItinerarioZonaService } from './itinerario-zona.service';
import { CreateItinerarioZonaDto } from './dto/create-itinerario-zona.dto';
import { UpdateItinerarioZonaDto } from './dto/update-itinerario-zona.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('itinerario-zona')
export class ItinerarioZonaController {
  constructor(private readonly itinerarioZonaService: ItinerarioZonaService) {}

  @Auth(Role.Admin)
  @Post()
  create(@Body() createItinerarioZonaDto: CreateItinerarioZonaDto) {
    return this.itinerarioZonaService.create(createItinerarioZonaDto);
  }

  @Auth(Role.Admin)
  @Get()
  findAll() {
    return this.itinerarioZonaService.findAll();
  }

  @Auth(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itinerarioZonaService.findOne(id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItinerarioZonaDto: UpdateItinerarioZonaDto) {
    return this.itinerarioZonaService.update(id, updateItinerarioZonaDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itinerarioZonaService.remove(id);
  }

  @Auth(Role.Admin)
  @Put('/activate/:id')
  restore(@Param('id') id: string) {
    return this.itinerarioZonaService.remove(id);
  }
}
