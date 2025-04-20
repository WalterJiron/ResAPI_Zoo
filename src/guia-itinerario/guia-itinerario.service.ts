import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuiaItinerarioDto } from './dto/create-guia-itinerario.dto';
import { UpdateGuiaItinerarioDto } from './dto/update-guia-itinerario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GuiaItinerario } from './entities/guia-itinerario.entity';
import { Repository } from 'typeorm';
import { ValidationService } from '../common/validation.services';
import { DeleteRestoreGuiaItinerarioDto } from './dto/delete-restore-guia-itinerario-dto';

@Injectable()
export class GuiaItinerarioService {
  constructor(
    @InjectRepository(GuiaItinerario)
      private readonly GuiaItinerarioRepository :Repository<GuiaItinerario>,
      ){ }

      async create(GuiaItinerarioDto: CreateGuiaItinerarioDto) {
        const Result = await this.GuiaItinerarioRepository.query(`
          DECLARE @Mensaje AS NVARCHAR(100)
          EXEC INSERTAR_GUIA_ITINERARIO
              @IdEmpleado = @0,
              @IdItinerario = @1,
              @MENSAJE = @Mensaje OUTPUT
          SELECT @Mensaje AS message
          `,[
            GuiaItinerarioDto.empleadoId,
            GuiaItinerarioDto.itinerarioId
          ]);

          return ValidationService.verifiedResult(Result, 'correctamente');
      }
  async findAll() {
    const GuiaItinerario = await this.GuiaItinerarioRepository.find();
    
    if(!GuiaItinerario){
      throw new NotFoundException (`No se encontro la relacion`);
    }

    return GuiaItinerario;
  }

  async findOne(id: string) {
    const Guia_Itinerario =await this.GuiaItinerarioRepository.findOne({where: {empleadoId: id}}
    );

    if(!Guia_Itinerario){
      throw new BadRequestException (`No se encontro la relacion con el id ${id}`);
    }
    
    return Guia_Itinerario;
  }

  async update(updateGuiaItinerarioDto: UpdateGuiaItinerarioDto) {
    const result = await this.GuiaItinerarioRepository.query(`
        DECLARE @MENSAJE AS NVARCHAR(100)
        EXEC UPDATE_GUIA_ITINERARIO
            @IDEMPLEADO_VIEJO = @0,
            @IDITINERARIO_VIEJO = @1,
            @IdEmpleado = @2,
            @IdItinerario = @3,
            @MENSAJE = @MENSAJE OUTPUT
        SELECT @MENSAJE AS message;
      `,[
        updateGuiaItinerarioDto.empleadoId,
        updateGuiaItinerarioDto.itinerarioId,
        updateGuiaItinerarioDto.idEmpleadoNuevo,
        updateGuiaItinerarioDto.idItinerarioNuevo
      ])
    return ValidationService.verifiedResult(result,'exito');
  }

  async remove(deleteGuiaItinerarioDto: DeleteRestoreGuiaItinerarioDto) {
    const result = await this.GuiaItinerarioRepository.query(`
      DECLARE @MENSAJE AS NVARCHAR(100)
      EXEC ELIMINAR_GUIAITINERARIO
          @IdEmpleado =@0,
          @IdItinerario =@1,
          @MENSAJE = @MENSAJE OUTPUT
      SELECT @MENSAJE AS message;
      `,[
        deleteGuiaItinerarioDto.idGuia,
        deleteGuiaItinerarioDto.idItinerario,
      ]);
    return ValidationService.verifiedResult(result,'correctamente');
  }

  async restore(restoreGuiaItinerarioDto: DeleteRestoreGuiaItinerarioDto) {
    const result = await this.GuiaItinerarioRepository.query(`
      DECLARE @MENSAJE AS VARCHAR(100)
      EXEC ACTIVAR_GUIAITINERARIO
          @IdEmpleado = @0,
          @IdItinerario = @1,
          @MENSAJE = @MENSAJE OUTPUT
      SELECT @MENSAJE AS message;
      `,[
        restoreGuiaItinerarioDto.idGuia,
        restoreGuiaItinerarioDto.idItinerario,
      ]);
    return ValidationService.verifiedResult(result,'correctamente');
  }
}
