import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>
  ) { }

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<{ message: string }> {
    const result = await this.empleadoRepository.query(`
            DECLARE @Mensaje AS VARCHAR(100)
            EXEC INSERCCION_EMPLEADO
              @PrimerNE = @0,
              @SegundoNE = @1,
              @PrimerAE = @2,
              @SegundoAE = @3,
              @DIREMPLEADO = @4,
              @TELEFONO = @5,
              @EMAIL = @6,
              @FECHAINGRE @7,
              @IdCargo @8,
              @MENSAJE = @Mensaje OUTPUT
            SELECT @Mensaje AS message
      `, [
      createEmpleadoDto.pne,
      createEmpleadoDto.sne,
      createEmpleadoDto.pae,
      createEmpleadoDto.sae,
      createEmpleadoDto.direccionE,
      createEmpleadoDto.telefonoE,
      createEmpleadoDto.emailE,
      createEmpleadoDto.fechaIngreso,
      createEmpleadoDto.idCargo,
    ]);

    if (!result[0].message.includes('exito')) {
      throw new BadRequestException({ message: result[0].message });
    }

    return { message: result[0].message };
  }

  async findAll() {
    const empleados = await this.empleadoRepository.find();

    if (!empleados) {
      throw new NotFoundException('No hay empleados en la base de datos.');
    }

    return empleados;
  }

  async findOne(id: string) {
    const empleado = await this.empleadoRepository.findOne({ where: { codigEmpleado: id } });

    if (!empleado) {
      throw new BadRequestException(`El empleado con el codigo: ${id} no existe en la base de datos.`);
    }

    return empleado;
  }

  async update(id: string, updateEmpleadoDto: UpdateEmpleadoDto) {
    const result = await this.empleadoRepository.query(`
            DECLARE @Mensaje AS VARCHAR(100)
            EXEC UPDATE_EMPLEADO
              @CDE = @0,
              @PrimerNE = @1,
              @SegundoNE = @2,
              @PrimerAE = @3,
              @SegundoAE = @4,
              @DIREMPLEADO = @5,
              @TELEFONO = @6,
              @EMAIL = @7,
              @FECHAINGRE @8,
              @IdCargo @9,
              @MENSAJE = @Mensaje OUTPUT
            SELECT @Mensaje AS message
      `, [
      id,
      updateEmpleadoDto.pne,
      updateEmpleadoDto.sne,
      updateEmpleadoDto.pae,
      updateEmpleadoDto.sae,
      updateEmpleadoDto.direccionE,
      updateEmpleadoDto.telefonoE,
      updateEmpleadoDto.emailE,
      updateEmpleadoDto.fechaIngreso,
      updateEmpleadoDto.idCargo,
    ]);

    if (!result[0].message.includes('exito')) {
      throw new BadRequestException({ message: result[0].message });
    }

    return { message: result[0].message };
  }

  async remove(id: string) {
    const result = await this.empleadoRepository.query(`
            DECLARE @Mensaje AS VARCHAR(100)
            EXEC ELIMINAR_EMPLEADO
              @CDE = @0,
              @MENSAJE = @Mensaje OUTPUT
            SELECT @Mensaje AS message
      `, [
      id,
    ]);

    if (!result[0].message.includes('exito')) {
      throw new BadRequestException({ message: result[0].message });
    }

    return { message: result[0].message };
  }

  async restore(id: string) {
    const result = await this.empleadoRepository.query(`
            DECLARE @Mensaje AS VARCHAR(100)
            EXEC ACTIVAREMPLEADO
              @CDE = @0,
              @MENSAJE = @Mensaje OUTPUT
            SELECT @Mensaje AS message
      `, [
      id,
    ]);

    if (!result[0].message.includes('exito')) {
      throw new BadRequestException({ message: result[0].message });
    }

    return { message: result[0].message };
  }
}
