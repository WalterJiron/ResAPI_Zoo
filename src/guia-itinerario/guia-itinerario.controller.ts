import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GuiaItinerarioService } from './guia-itinerario.service';
import { CreateGuiaItinerarioDto } from './dto/create-guia-itinerario.dto';
import { UpdateGuiaItinerarioDto } from './dto/update-guia-itinerario.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('guia-itinerario')
export class GuiaItinerarioController {
  constructor(private readonly guiaItinerarioService: GuiaItinerarioService) {}

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Post()
  create(@Body() createGuiaItinerarioDto: CreateGuiaItinerarioDto) {
    return this.guiaItinerarioService.create(createGuiaItinerarioDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get()
  findAll() {
    return this.guiaItinerarioService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guiaItinerarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuiaItinerarioDto: UpdateGuiaItinerarioDto) {
    return this.guiaItinerarioService.update(id, updateGuiaItinerarioDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guiaItinerarioService.remove(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete('/activate/:id')
  restore(@Param('id') id: string) {
    return this.guiaItinerarioService.restore(id);
  }
}
