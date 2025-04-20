// src/itinerarios/itinerarios.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Itinerario } from './entities/itinerario.entity';
import { CreateItinerarioDto } from './dto/create-itinerario.dto';
import { UpdateItinerarioDto } from './dto/update-itinerario.dto';
import { ValidationService } from 'src/common/validation.services';

@Injectable()
export class ItinerariosService {
  constructor(
    @InjectRepository(Itinerario)
    private readonly itinerarioRepository: Repository<Itinerario>,
  ) { }

  async create(createItinerarioDto: CreateItinerarioDto): Promise<{ message: string; code?: string }> {
    try {
      const result = await this.itinerarioRepository.query(`
          DECLARE @MensajeOUT VARCHAR(100), @IdOUT UNIQUEIDENTIFIER;

          EXEC ProcInsertItinerario
            @Duracion = @0,
            @Longitud = @1,
            @MaxVisitantes = @2,
            @NumEspecies = @3,
            @Fecha = @4,
            @Hora = @5,
            @Mensaje = @MensajeOUT OUTPUT,
            @NuevoIdItinerario = @IdOUT OUTPUT;

          SELECT @MensajeOUT AS message, CAST(@IdOUT AS VARCHAR(36)) AS code;
        `,
        [
          ValidationService.formatTime(createItinerarioDto.duracion),
          createItinerarioDto.longitud,
          createItinerarioDto.maxVisitantes,
          createItinerarioDto.numEspecies,
          createItinerarioDto.fecha,
          ValidationService.formatTime(createItinerarioDto.horaInicio),
        ]
      );

      return ValidationService.verifiedResultForID(result, 'correctamente');

    } catch (error) {
      console.error('Error en ItinerarioService.create:', error);
      throw new BadRequestException('Error inesperado al crear el itinerario');
    }
  }


  async findAll(): Promise<Itinerario[]> {
    try {
      const itinerarios = await this.itinerarioRepository.find({
        order: { fecha: 'ASC', horaInicio: 'ASC' }, // Ordenar por fecha y hora
      });

      if (!itinerarios) {
        throw new NotFoundException('No existen itinerarios');
      }

      return itinerarios;
    } catch (error) {
      console.error(`Error en ItinerarioService.finAll: ${error}`);
      throw new BadRequestException('Error inesperado al obtener los itinerarios');
    }

  }

  async findOne(id: string): Promise<Itinerario> {
    try {
      const itinerario = await this.itinerarioRepository.findOne({
        where: { codigoIti: id },
        order: { fecha: 'ASC', horaInicio: 'ASC' },
      });

      if (!itinerario) {
        throw new NotFoundException(`Itinerario con ID ${id} no encontrado`);
      }

      return itinerario;
    } catch (error) {
      console.error(`Error en ItinerarioService.findOne: ${error}`);
      throw new BadRequestException('Error inesperado al obtener el itinerario');
    }
  }


  async update(id: string, updateItinerarioDto: UpdateItinerarioDto) {
    return 'HUY SKIBIDI ;[';
  }


  async remove(id: string) {
    return 'pipipi'
  }

}