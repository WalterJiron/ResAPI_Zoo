import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ZonasService } from './zonas.service';
import { CreateZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Auth(Role.Admin)
@Controller('zonas')
export class ZonasController {
  constructor(private readonly zonasService: ZonasService) { }

  @Post()
  async create(@Body() createZonaDto: CreateZonaDto) {
    return this.zonasService.create(createZonaDto);
  }

  @Get()
  async findAll() {
    return this.zonasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.zonasService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateZonaDto: UpdateZonaDto) {
    return this.zonasService.update(id, updateZonaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.zonasService.remove(id);
  }

  @Put('/Activate/:id')
  async restore(@Param('id') id: string) {
    return this.zonasService.restore(id);
  }
}
