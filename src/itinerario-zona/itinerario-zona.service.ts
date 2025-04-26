import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItinerarioZonaDto } from './dto/create-itinerario-zona.dto';
import { UpdateItinerarioZonaDto } from './dto/update-itinerario-zona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItinerarioZona } from './entities/itinerario-zona.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/common/validation.services';
import { DeleteRestoreItinerarioZonaDto } from './dto/delete-restore-itinerario-zona-dto';

@Injectable()
export class ItinerarioZonaService {
  constructor(
    @InjectRepository(ItinerarioZona)
      private readonly createItinerarioZonaRepository: Repository<ItinerarioZona>, ){ }

  async create(createItinerarioZonaDto: CreateItinerarioZonaDto): Promise<{message: string}> {
    const itinerarioZona = await this.createItinerarioZonaRepository.query(`
              DECLARE @Mensaje AS  NVARCHAR(100);

              EXEC INSERTAR_ITINERARIO_ZONA
                @IdItinerario = @0,
                @IDzona =@1,
                @MENSAJE =@Mensaje OUTPUT;

              SELECT @Mensaje as message;
      `,[
        createItinerarioZonaDto.itinerarioId,
        createItinerarioZonaDto.zonaId,
      ]);

    return ValidationService.verifiedResult(itinerarioZona, 'realizada');
  }

  async findAll() {
    const ItinerarioZonas = await this.createItinerarioZonaRepository.find();

    if(!ItinerarioZonas.length){
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

  async update(updateItinerarioZonaDto: UpdateItinerarioZonaDto): Promise<{message: string}> {
    const result = await this.createItinerarioZonaRepository.query(`
              DECLARE @MENSAJE AS NVARCHAR(100);

              EXEC ACTUALIZAR_ITINERARIO_ZONA
                  @IDITINERARIO_VIEJO = @0 ,
                  @IDZONA_VIEJO  = @1,
                  @IdItinerario  = @2,
                  @IDzona = @3 ,
                  @MENSAJE = @MENSAJE OUTPUT;

              SELECT @MENSAJE AS message;
      `,[
        updateItinerarioZonaDto.itinerarioId,
        updateItinerarioZonaDto.zonaId,
        updateItinerarioZonaDto.idItinerarioNuevo,
        updateItinerarioZonaDto.idZonaNueva,
      ]);
    return  ValidationService.verifiedResult(result, 'realizada');
  }

  async remove(deleteItinerarioZonaDto: DeleteRestoreItinerarioZonaDto): Promise<{message: string}> {
    const result = await this.createItinerarioZonaRepository.query(`
              DECLARE @MENSAJE AS NVARCHAR(100);

              EXEC ELIMINAR_ITINERARIOZONA
                  @IdItinerario = @0,
                  @IDzona =@1,
                  @MENSAJE =@MENSAJE OUTPUT;

              SELECT @MENSAJE AS message
      `,[
        deleteItinerarioZonaDto.idItinerario,
        deleteItinerarioZonaDto.idZona,
      ]);
    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async restore(restoreItinerarioZonaDto: DeleteRestoreItinerarioZonaDto): Promise<{message: string}> {
    const result = await this.createItinerarioZonaRepository.query(`
              DECLARE @MENSAJE AS NVARCHAR(100);

              EXEC ACTIVAR_ITINERARIOZONA
                  @IdItinerario = @0,
                  @IDzona = @1,
                  @MENSAJE = @MENSAJE OUTPUT;

              SELECT @MENSAJE AS message;
      `,[
        restoreItinerarioZonaDto.idItinerario,
        restoreItinerarioZonaDto.idZona,
      ])
    return ValidationService.verifiedResult(result, 'correctamente');
  }
  
}
