import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitatContinenteDto } from './dto/create-habitat-continente.dto';
import { UpdateHabitatContinenteDto } from './dto/update-habitat-continente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitatContinente } from './entities/habitat-continente.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/common/validation.services';
import { DeleteRestoreHabitadContinenteDto } from './dto/delete-restore-habitad-continente-dto';

@Injectable()
export class HabitatContinenteService {
  constructor(
    @InjectRepository(HabitatContinente)
    private readonly habitatContinenteRepository: Repository<HabitatContinente>,
  ) { }

  async create(createHabitadContinenteDto: CreateHabitatContinenteDto): Promise<{ message: string }> {
    const result = await this.habitatContinenteRepository.query(`
              DECLARE @Mensaje as NVARCHAR(100);

              EXEC Insertar_HabitadContinente
                @Habitad = @0,
                @CONTINENTE = @1,
                @MENSAJE = @Mensaje OUTPUT;

              SELECT @Mensaje as message;
      `, [
      createHabitadContinenteDto.habitatId,
      createHabitadContinenteDto.continenteId,
    ]);

    return ValidationService.verifiedResult(result, 'exito');
  }

  async findAll() {
    const habitad_continentes = await this.habitatContinenteRepository.find();

    if (!habitad_continentes.length) {
      throw new NotFoundException('No se encontro la relacion');
    }

    return habitad_continentes;
  }

  async findOne(id: string) {
    const habitad_continente = await this.habitatContinenteRepository.findOne({ where: { habitatId: id } });

    if (!habitad_continente) {
      throw new BadRequestException('No se encontro la relacion con el id ${id}');
    }
    return habitad_continente;
  }

  async update(updateHabitatContinenteDto: UpdateHabitatContinenteDto): Promise<{ message: string }> {
    const result = await this.habitatContinenteRepository.query(`
                DECLARE @MENSAJE AS NVARCHAR(100);

                EXEC  Update_HabitatContinente
                      @Habitad = @0,
                      @CONTINENTE = @1,
                      @HabitadVieja = @2,
                      @CONTINENTE_VIEJO = @3,
                      @MENSAJE = @MENSAJE OUTPUT;

                SELECT @MENSAJE AS message;
      `, [
      updateHabitatContinenteDto.idHabitadNueva,
      updateHabitatContinenteDto.idContinenteNuevo,
      updateHabitatContinenteDto.habitatId,
      updateHabitatContinenteDto.continenteId,
    ]);

    return ValidationService.verifiedResult(result, 'exito');
  }

  async remove(deleteEspecieHabitatDto: DeleteRestoreHabitadContinenteDto): Promise<{ message: string }> {
    const result = await this.habitatContinenteRepository.query(`
              DECLARE @MENSAJE AS NVARCHAR(100);

              EXEC Eliminar_HabitatContinente
                    @Habitat = @0,
                    @Cont = @1,
                    @MENSAJE = @MENSAJE OUTPUT;

              SELECT @MENSAJE AS message;
      `, [
      deleteEspecieHabitatDto.idHabitat,
      deleteEspecieHabitatDto.idContinente,
    ]);

    return ValidationService.verifiedResult(result, 'desactivada');
  }

  async restore(restoreHabitadContinenteDto: DeleteRestoreHabitadContinenteDto): Promise<{ message: string }> {
    const result = await this.habitatContinenteRepository.query(`
              DECLARE @MENSAJE AS NVARCHAR(100);

              EXEC Activar_HabitatContinente
                  @Habitat = @0 ,
                  @Cont = @1,
                  @MENSAJE = @MENSAJE OUTPUT;

              SELECT @MENSAJE AS message;
      `, [
      restoreHabitadContinenteDto.idHabitat,
      restoreHabitadContinenteDto.idContinente,
    ]);

    return ValidationService.verifiedResult(result, 'activada');
  }

}
