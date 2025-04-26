import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleEmpleadoDto } from './create-detalle-empleado.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateDetalleEmpleadoDto extends PartialType(CreateDetalleEmpleadoDto) { }
