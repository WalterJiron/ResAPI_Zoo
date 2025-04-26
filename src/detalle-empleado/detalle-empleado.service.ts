import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleEmpleadoDto } from './dto/create-detalle-empleado.dto';
import { UpdateDetalleEmpleadoDto } from './dto/update-detalle-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleEmpleado } from './entities/detalle-empleado.entity';
import { Repository } from 'typeorm';
import { ValidationService } from '../common/validation.services';

@Injectable()
export class DetalleEmpleadoService {
  constructor(
    @InjectRepository(DetalleEmpleado)
    private readonly detalleEmpleadoRepository: Repository<DetalleEmpleado>,
  ) { }

  async create(createDetalleEmpleadoDto: CreateDetalleEmpleadoDto): Promise<{ message: string }> {
    const result = await this.detalleEmpleadoRepository.query(`
              DECLARE @Mensaje AS NVARCHAR(100);

              EXEC ProcInsertDetalleEmpleado
                  @CodigoEmpleado = @0,
                  @Cedula = @1,
                  @FechaNacimiento = @2,
                  @Genero = @3,
                  @EstadoCivil = @4,
                  @INSS = @5,
                  @TelefonoEmergencia = @6,
                  @Mensaje = @Mensaje OUTPUT;

              SELECT @Mensaje AS message;
      `, [
      createDetalleEmpleadoDto.codigEmpleado,
      createDetalleEmpleadoDto.cedula,
      createDetalleEmpleadoDto.fechaNacimiento,
      createDetalleEmpleadoDto.genero,
      createDetalleEmpleadoDto.estadoCivil,
      createDetalleEmpleadoDto.INSS,
      createDetalleEmpleadoDto.telefonoEmergencia,
    ]
    );

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async findAll() {
    const detalleEmpleados = await this.detalleEmpleadoRepository.find();

    if (!detalleEmpleados.length) {
      throw new NotFoundException('No se encontraron empleados');
    }

    return detalleEmpleados;
  }

  async findOne(id: string) {
    const detalleEmpleado = await this.detalleEmpleadoRepository.findOne({
      where: { codigoDetEmpleado: id },
    });

    if (!detalleEmpleado) {
      throw new BadRequestException(`Empleado con id ${id} no encontrado`);
    }

    return detalleEmpleado;
  }

  async update(id: string, updateDetalleEmpleadoDto: UpdateDetalleEmpleadoDto): Promise<{ message: string }> {
    const result = await this.detalleEmpleadoRepository.query(`
              DECLARE @Mensaje AS NVARCHAR(100);

              EXEC ProcUpdateDetalleEmpleado
                  @CodigoDetEmpleado = @0,
                  @Cedula = @1,
                  @FechaNacimiento = @2,
                  @Genero = @3,
                  @EstadoCivil = @4,
                  @INSS = @5,
                  @TelefonoEmergencia = @6,
                  @Mensaje = @Mensaje OUTPUT;  
              
               SELECT @Mensaje AS message;
      `, [
      id,
      updateDetalleEmpleadoDto.cedula,
      updateDetalleEmpleadoDto.fechaNacimiento,
      updateDetalleEmpleadoDto.genero,
      updateDetalleEmpleadoDto.estadoCivil,
      updateDetalleEmpleadoDto.INSS,
      updateDetalleEmpleadoDto.telefonoEmergencia,
    ]
    );

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.detalleEmpleadoRepository.query(`
              DECLARE @Mensaje AS NVARCHAR(100);

              EXEC ProcDeleteDetalleEmpleado
                  @CodigoDetEmpleado = @0,
                  @Mensaje = @Mensaje OUTPUT;

              SELECT @Mensaje AS message;
      `, [id]);

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async restore(id: string): Promise<{ message: string }> {
    const result = await this.detalleEmpleadoRepository.query(`
              DECLARE @Mensaje AS NVARCHAR(100);

              EXEC ProcRestorDetalleEmpleado
                  @CodigoDetEmpleado = @0,
                  @Mensaje = @Mensaje OUTPUT;

              SELECT @Mensaje AS message;
      `, [id]);

    return ValidationService.verifiedResult(result, 'correctamente');
  }
}
