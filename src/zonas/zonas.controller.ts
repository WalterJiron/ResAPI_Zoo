import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ZonasService } from './zonas.service';
import { CreateZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';


@Controller('zonas')
export class ZonasController {
  constructor(private readonly zonasService: ZonasService) { }

  @Auth(Role.Admin)
  @Post()
  async create(@Body() createZonaDto: CreateZonaDto) {
    return this.zonasService.create(createZonaDto);
  }

  @Auth(Role.Admin)
  @Get()
  async findAll() {
    return this.zonasService.findAll();
  }

  @Auth(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.zonasService.findOne(id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateZonaDto: UpdateZonaDto) {
    return this.zonasService.update(id, updateZonaDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.zonasService.remove(id);
  }

  @Auth(Role.Admin)
  @Put('/Activate/:id')
  async restore(@Param('id') id: string) {
    return this.zonasService.restore(id);
  }
}
