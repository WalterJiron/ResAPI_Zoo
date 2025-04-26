import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DetalleEmpleadoService } from './detalle-empleado.service';
import { CreateDetalleEmpleadoDto } from './dto/create-detalle-empleado.dto';
import { UpdateDetalleEmpleadoDto } from './dto/update-detalle-empleado.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/role.enum';


@Auth(Role.Admin)
@Controller('detalle-empleado')
export class DetalleEmpleadoController {
  constructor(private readonly detalleEmpleadoService: DetalleEmpleadoService) {}

  @Post()
  create(@Body() createDetalleEmpleadoDto: CreateDetalleEmpleadoDto) {
    return this.detalleEmpleadoService.create(createDetalleEmpleadoDto);
  }

  @Get()
  findAll() {
    return this.detalleEmpleadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleEmpleadoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleEmpleadoDto: UpdateDetalleEmpleadoDto) {
    return this.detalleEmpleadoService.update(id, updateDetalleEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleEmpleadoService.remove(id);
  }

  @Put('/activate/:id')
  retore(@Param('id') id: string) {
    return this.detalleEmpleadoService.restore(id);
  }

}
