import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ItinerarioZonaService } from './itinerario-zona.service';
import { CreateItinerarioZonaDto } from './dto/create-itinerario-zona.dto';
import { UpdateItinerarioZonaDto } from './dto/update-itinerario-zona.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { DeleteRestoreItinerarioZonaDto } from './dto/delete-restore-itinerario-zona-dto';

@Auth(Role.Admin)
@Controller('itinerario-zona')
export class ItinerarioZonaController {
  constructor(private readonly itinerarioZonaService: ItinerarioZonaService) { }

  @Post()
  create(@Body() createItinerarioZonaDto: CreateItinerarioZonaDto): Promise<{ message: string }> {
    return this.itinerarioZonaService.create(createItinerarioZonaDto);
  }

  @Get()
  findAll() {
    return this.itinerarioZonaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itinerarioZonaService.findOne(id);
  }

  @Patch()
  update(@Body() updateItinerarioZonaDto: UpdateItinerarioZonaDto): Promise<{ message: string }> {
    return this.itinerarioZonaService.update(updateItinerarioZonaDto);
  }

  @Delete()
  remove(@Body() deleteItinerarioZonaDto: DeleteRestoreItinerarioZonaDto): Promise<{ message: string }> {
    return this.itinerarioZonaService.remove(deleteItinerarioZonaDto);
  }

  @Put('/activate')
  restore(@Body() restoreItinerarioZonaDto: DeleteRestoreItinerarioZonaDto): Promise<{ message: string }> {
    return this.itinerarioZonaService.restore(restoreItinerarioZonaDto);
  }
}
