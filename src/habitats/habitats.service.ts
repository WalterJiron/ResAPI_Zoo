import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitat } from './entities/habitat.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/common/validation.services';

@Injectable()
export class HabitatsService {
  constructor(
    @InjectRepository(Habitat)
    private readonly habitatRepository: Repository<Habitat>,
  ) { }

  async create(createHabitatDto: CreateHabitatDto): Promise<{ message: string, code?: string }> {
    const result = await this.habitatRepository.query(`
              DECLARE @Mensaje VARCHAR(100), @IdHabitat UNIQUEIDENTIFIER;

              EXEC ProcInsertHabitat
                @Nombre = @0,
                @Clima = @1,
                @DescripHabitat = @2,
                @CodigoZona = @3,
                @Mensaje = @Mensaje OUTPUT,
                @IdHabitat = IdHabitat OUTPUT;

              SELECT @Mensaje AS message, @IdHabitat AS code;
      `, [
      createHabitatDto.nombre,
      createHabitatDto.clima,
      createHabitatDto.descripHabitat,
      createHabitatDto.codigoZona,
    ]
    );

    return ValidationService.verifiedResultForID(result, 'correctamente');

  }

  async findAll() {
    const habitats = await this.habitatRepository.find({
      relations: ['zona', 'continentes', 'especies'],
      order: { nombre: 'ASC' }, // Ordenar por nombre
    });

    if (!habitats.length) {
      throw new NotFoundException('No se encontraron habitats');
    }

    return habitats;
  }

  async findOne(id: string) {
    const habitat = await this.habitatRepository.findOne({
      where: { codigoHabitat: id },
      relations: ['zona', 'continentes', 'especies'],
      order: { nombre: 'ASC' },
    });

    if (!habitat) {
      throw new BadRequestException(`No se encontro el habitat con el codigo: ${id}`);
    }

    return habitat;
  }

  async update(id: string, updateHabitatDto: UpdateHabitatDto): Promise<{ message: string }> {
    const result = await this.habitatRepository.query(`
              DECLARE @Mensaje VARCHAR(100);

              EXEC ProcUpdateHabitat
                @CodigoHabitat = @0,
                @Nombre = @1,
                @Clima = @2,
                @DescripHabitat = @3,
                @CodigoZona = @4,
                @Mensaje = @Mensaje OUTPUT;

              SELECT @Mensaje AS message;
      `, [
      id,
      updateHabitatDto.nombre,
      updateHabitatDto.clima,
      updateHabitatDto.descripHabitat,
      updateHabitatDto.codigoZona,
    ]
    );

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.habitatRepository.query(`
              DECLARE @Mensaje VARCHAR(100);

              EXEC ProcDeleteHabitat
                @CodigoHabitat = @0,
                @Mensaje = @Mensaje OUTPUT;

              SELECT @Mensaje AS message;
      `, [id]);

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async restore(id: string): Promise<{ message: string }> {
    const result = await this.habitatRepository.query(`
              DECLARE @Mensaje VARCHAR(100);

              EXEC ProcRestoreHabitat
                @CodigoHabitat = @0,
                @Mensaje = @Mensaje OUTPUT;

              SELECT @Mensaje AS message;
      `, [id]);

    return ValidationService.verifiedResult(result, 'correctamente');
  }
}
