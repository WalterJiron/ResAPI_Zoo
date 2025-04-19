import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitatContinenteDto } from './dto/create-habitat-continente.dto';
import { UpdateHabitatContinenteDto } from './dto/update-habitat-continente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitatContinente } from './entities/habitat-continente.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/common/validation.services';

@Injectable()
export class HabitatContinenteService {
  constructor(
    @InjectRepository(HabitatContinente)
    private readonly habitatContinenteRepository: Repository<HabitatContinente>,
  ) { }

  async create(createHabitadContinenteDto: CreateHabitatContinenteDto) {
    const result = await this.habitatContinenteRepository.query(`
      DECLARE @Mensaje as VARCHAR(100)
      EXEC Insertar_HabitadContinente
        @Habitad = @0,
        @CONTINENTE = @1,
        @MENSAJE =@Mensaje OUTPUT
      SELECT @Mensaje as message;
      `,[
        createHabitadContinenteDto.continenteId,
        createHabitadContinenteDto.continenteId,
      ]);

      return ValidationService.verifiedResult(result , 'exito');
  }

  async findAll() {
    const habitad_continentes = await this.habitatContinenteRepository.find();

    if(!habitad_continentes){
      throw new NotFoundException('No se encontro la relacion');
    }

    return habitad_continentes;
  }

  async findOne(id: string) {
    const habitad_continente = await this.habitatContinenteRepository.findOne({where:{habitatId : id}});

    if(!habitad_continente){
      throw new BadRequestException('No se encontro la relacion con el id ${id}');
    }
    return habitad_continente;
  }

  update(id: string, updateHabitatContinenteDto: UpdateHabitatContinenteDto) {
    return `This action updates a #${id} habitatContinente`;
  }

  remove(id: string) {
    return `This action removes a #${id} habitatContinente`;
  }

  restore(id: string) {
    return `This action restore a #${id} habitatContinente`;
  }
}
