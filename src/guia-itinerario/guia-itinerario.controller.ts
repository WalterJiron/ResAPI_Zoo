import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GuiaItinerarioService } from './guia-itinerario.service';
import { CreateGuiaItinerarioDto } from './dto/create-guia-itinerario.dto';
import { UpdateGuiaItinerarioDto } from './dto/update-guia-itinerario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { DeleteRestoreGuiaItinerarioDto } from './dto/delete-restore-guia-itinerario-dto';

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

  @Patch()
  update( @Body() updateGuiaItinerarioDto: UpdateGuiaItinerarioDto) {
    return this.guiaItinerarioService.update(updateGuiaItinerarioDto);
  }

  @Delete()
  remove(@Body() deleteGuiaItinerarioDto: DeleteRestoreGuiaItinerarioDto) {
    return this.guiaItinerarioService.remove(deleteGuiaItinerarioDto);
  }

  @Put('/activate')
  restore(@Body() restoreGuiaItinerarioDto: DeleteRestoreGuiaItinerarioDto) {
    return this.guiaItinerarioService.restore(restoreGuiaItinerarioDto);
  }
}
