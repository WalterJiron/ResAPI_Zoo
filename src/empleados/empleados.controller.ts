import {
  Controller, Get, Post,
  Body, Patch, Param, Delete, Put
} from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/role.enum';

@Auth(Role.Admin)
@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) { }

  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto): Promise<{message: string, code?: string}> {
    return this.empleadosService.create(createEmpleadoDto);
  }


  @Get()
  findAll() {
    return this.empleadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpleadoDto: UpdateEmpleadoDto): Promise<{message: string}> {
    return this.empleadosService.update(id, updateEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{message: string}> {
    return this.empleadosService.remove(id);
  }

  @Put('/activate/:id')
  restore(@Param('id') id: string): Promise<{message: string}> {
    return this.empleadosService.restore(id);
  }
}
