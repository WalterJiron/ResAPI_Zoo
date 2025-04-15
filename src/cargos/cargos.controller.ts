import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CargosService } from './cargos.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('cargos')
export class CargosController {
  constructor(private readonly cargosService: CargosService) { }

  @Auth(Role.Admin)
  @Post()
  create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargosService.create(createCargoDto);
  }

  @Auth(Role.Admin)
  @Get()
  findAll() {
    return this.cargosService.findAll();
  }

  @Auth(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargosService.findOne(id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargosService.update(id, updateCargoDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargosService.remove(id);
  }

  @Auth(Role.Admin)
  @Put('/Activate/:id')
  restore(@Param('id') id: string) {
    return this.cargosService.restore(id);
  }
}
