import { Module } from '@nestjs/common';
import { DetalleEmpleadoService } from './detalle-empleado.service';
import { DetalleEmpleadoController } from './detalle-empleado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleEmpleado } from './entities/detalle-empleado.entity';
import { EmpleadosModule } from 'src/empleados/empleados.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([DetalleEmpleado]),
    EmpleadosModule,
  ],
  controllers: [DetalleEmpleadoController],
  providers: [DetalleEmpleadoService],
})
export class DetalleEmpleadoModule {}
