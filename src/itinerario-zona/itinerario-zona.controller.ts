import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItinerarioZonaService } from './itinerario-zona.service';
import { CreateItinerarioZonaDto } from './dto/create-itinerario-zona.dto';
import { UpdateItinerarioZonaDto } from './dto/update-itinerario-zona.dto';

@Controller('itinerario-zona')
export class ItinerarioZonaController {
  constructor(private readonly itinerarioZonaService: ItinerarioZonaService) {}

  @Post()
  create(@Body() createItinerarioZonaDto: CreateItinerarioZonaDto) {
    return this.itinerarioZonaService.create(createItinerarioZonaDto);
  }

  @Get()
  findAll() {
    return this.itinerarioZonaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itinerarioZonaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItinerarioZonaDto: UpdateItinerarioZonaDto) {
    return this.itinerarioZonaService.update(+id, updateItinerarioZonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itinerarioZonaService.remove(+id);
  }
}
