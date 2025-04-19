import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItinerarioZonaDto } from './dto/create-itinerario-zona.dto';
import { UpdateItinerarioZonaDto } from './dto/update-itinerario-zona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItinerarioZona } from './entities/itinerario-zona.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/common/validation.services';

@Injectable()
export class ItinerarioZonaService {
  constructor(
    @InjectRepository(ItinerarioZona)
      private readonly createItinerarioZonaRepository: Repository<ItinerarioZona>, ){ }

  async create(createItinerarioZonaDto: CreateItinerarioZonaDto) {
    const itinerarioZona = this.createItinerarioZonaRepository.query(`
      DECLARE @Mensaje AS VARCHAR(100)
      EXEC INSERTAR_ITINERARIO_ZONA
        @IdItinerario = @0,
        @IDzona =@1,
        @MENSAJE =@mensaje OUTPUT
      SELECT @Mensaje as message
      `,[
        createItinerarioZonaDto.itinerarioId,
        createItinerarioZonaDto.zonaId,
      ]);

    return ValidationService.verifiedResult(itinerarioZona, 'realizada');
  }

  async findAll() {
    const ItinerarioZonas = await this.createItinerarioZonaRepository.find();

    if(!ItinerarioZonas){
      throw new NotFoundException('No se encontraron relaciones');
    } 
    return ItinerarioZonas;
  }

  async findOne(id: string) {
    const ItinerarioZona =await this.createItinerarioZonaRepository.findOne({where:{itinerarioId : id}});
    
    if(!ItinerarioZona){
      throw new BadRequestException(`No se encontro la relacion con el id ${id}`);
    }

    return ItinerarioZona;
  }

  update(id: string, updateItinerarioZonaDto: UpdateItinerarioZonaDto) {
    return `This action updates a #${id} itinerarioZona`;
  }

  remove(id: string) {
    return `This action removes a #${id} itinerarioZona`;
  }

  restore(id: string) {
    return `This action removes a #${id} itinerarioZona`;
  }
}
