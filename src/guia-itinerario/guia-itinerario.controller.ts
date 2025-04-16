import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuiaItinerarioService } from './guia-itinerario.service';
import { CreateGuiaItinerarioDto } from './dto/create-guia-itinerario.dto';
import { UpdateGuiaItinerarioDto } from './dto/update-guia-itinerario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Auth(Role.Admin)
@Controller('guia-itinerario')
export class GuiaItinerarioController {
  constructor(private readonly guiaItinerarioService: GuiaItinerarioService) {}

  @Post()
  create(@Body() createGuiaItinerarioDto: CreateGuiaItinerarioDto) {
    return this.guiaItinerarioService.create(createGuiaItinerarioDto);
  }

  @Get()
  findAll() {
    return this.guiaItinerarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guiaItinerarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuiaItinerarioDto: UpdateGuiaItinerarioDto) {
    return this.guiaItinerarioService.update(id, updateGuiaItinerarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guiaItinerarioService.remove(id);
  }

  @Delete('/activate/:id')
  restore(@Param('id') id: string) {
    return this.guiaItinerarioService.restore(id);
  }
}
