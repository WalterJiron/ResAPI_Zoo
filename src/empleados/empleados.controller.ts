import {
  Controller, Get, Post,
  Body, Patch, Param, Delete, Put
} from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';



@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) { }

  @Auth(Role.Admin)
  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadosService.create(createEmpleadoDto);
  }


  @Auth(Role.Admin)
  @Get()
  findAll() {
    return this.empleadosService.findAll();
  }

  @Auth(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadosService.findOne(id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.empleadosService.update(id, updateEmpleadoDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadosService.remove(id);
  }

  @Auth(Role.Admin)
  @Put('/Activate/:id')
  restore(@Param('id') id: string) {
    return this.empleadosService.restore(id);
  }
}
