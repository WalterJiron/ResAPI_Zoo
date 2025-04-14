import {
  Controller, Get, Post,
  Body, Patch, Param, Delete,
  UseGuards, Put
} from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) { }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadosService.create(createEmpleadoDto);
  }


  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get()
  findAll() {
    return this.empleadosService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadosService.findOne(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.empleadosService.update(id, updateEmpleadoDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadosService.remove(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Put('/Activate/:id')
  restore(@Param('id') id: string) {
    return this.empleadosService.restore(id);
  }
}
