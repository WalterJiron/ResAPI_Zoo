import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ItinerarioZonaService } from './itinerario-zona.service';
import { CreateItinerarioZonaDto } from './dto/create-itinerario-zona.dto';
import { UpdateItinerarioZonaDto } from './dto/update-itinerario-zona.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('itinerario-zona')
export class ItinerarioZonaController {
  constructor(private readonly itinerarioZonaService: ItinerarioZonaService) {}

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Post()
  create(@Body() createItinerarioZonaDto: CreateItinerarioZonaDto) {
    return this.itinerarioZonaService.create(createItinerarioZonaDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get()
  findAll() {
    return this.itinerarioZonaService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itinerarioZonaService.findOne(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItinerarioZonaDto: UpdateItinerarioZonaDto) {
    return this.itinerarioZonaService.update(id, updateItinerarioZonaDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itinerarioZonaService.remove(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Put('/activate/:id')
  restore(@Param('id') id: string) {
    return this.itinerarioZonaService.remove(id);
  }
}
