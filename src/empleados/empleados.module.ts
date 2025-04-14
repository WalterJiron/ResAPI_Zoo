import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { CargosModule } from '../cargos/cargos.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Empleado]),
    CargosModule
  ],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
  exports: [TypeOrmModule]
})
export class EmpleadosModule {}
