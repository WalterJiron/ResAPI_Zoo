import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CargosService } from './cargos.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Auth(Role.Admin)
@Controller('cargos')
export class CargosController {
  constructor(private readonly cargosService: CargosService) { }

  @Post()
  create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargosService.create(createCargoDto);
  }

  @Get()
  findAll() {
    return this.cargosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargosService.update(id, updateCargoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargosService.remove(id);
  }

  @Put('/Activate/:id')
  restore(@Param('id') id: string) {
    return this.cargosService.restore(id);
  }
}
