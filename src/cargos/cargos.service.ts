import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CargosService {
  constructor(
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
  ) { }

  async create(createCargoDto: CreateCargoDto): Promise<{ message: string }> {
    const result = await this.cargoRepository.query(`
            DECLARE @Mensaje AS VARCHAR(100)
            EXEC Insertar_Cargo
              @NombreC = @0,
              @DescripcionC = @1,
              @MENSAJE = @Mensaje OUTPUT
            SELECT @Mensaje AS message
      `, [
      createCargoDto.nombreCargo,
      createCargoDto.descripCargo
    ]
    );

    if (!result[0].message.includes('exito')) {
      throw new BadRequestException({ message: result[0].message });
    }

    return { message: result[0].message };
  }

  async findAll() {
    const cargos = await this.cargoRepository.find();

    if (!cargos) {
      throw new NotFoundException('No hay cargos disponobles.');
    }

    return cargos;
  }

  async findOne(id: string) {
    const cargo = await this.cargoRepository.findOne({ where: { codifoCargo: id } })

    if (!cargo) {
      throw new NotFoundException(`El codigo: ${id} no le pertenece a ningun cargo.`);
    }

    return cargo
  }

  async update(id: string, updateCargoDto: UpdateCargoDto): Promise<{ message: string }> {
    const result = await this.cargoRepository.query(`
            DECLARE @Mensaje AS VARCHAR(100)
            EXEC UPDATE_CARGO
              @CDC = @0,
              @NombreC = @1,
              @DescripcionC = @2,
              @MENSAJE = @Mensaje OUTPUT
            SELECT @Mensaje AS message
      `, [
      id,
      updateCargoDto.nombreCargo,
      updateCargoDto.descripCargo
    ]
    );

    if (!result[0].message.includes('exito')) {
      throw new BadRequestException({ message: result[0].message });
    }

    return { message: result[0].message };
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.cargoRepository.query(`
            DECLARE @Mensaje AS VARCHAR(100)
            EXEC UPDATE_CARGO
              @CDC = @0,
              @MENSAJE = @Mensaje OUTPUT
            SELECT @Mensaje AS message
      `, [id]
    );

    if (!result[0].message.includes('exito')) {
      throw new BadRequestException({ message: result[0].message });
    }

    return { message: result[0].message };
  }

  async restore(id: string): Promise<{ message: string }> {
    const result = await this.cargoRepository.query(`
            DECLARE @Mensaje AS VARCHAR(100)
            EXEC ACTIVAR_CARGO
              @CDC = @0,
              @MENSAJE = @Mensaje OUTPUT
            SELECT @Mensaje AS message
      `, [id]
    );

    if (!result[0].message.includes('exito')) {
      throw new BadRequestException({ message: result[0].message });
    }

    return { message: result[0].message };
  }
}
