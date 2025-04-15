// src/itinerarios/itinerarios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Itinerario } from './entities/itinerario.entity';
import { Zona } from '../zonas/entities/zona.entity';
import { Empleado } from '../empleados/entities/empleado.entity';
import { ItinerarioZona } from '../itinerario-zona/entities/itinerario-zona.entity';
import { GuiaItinerario } from '../guia-itinerario/entities/guia-itinerario.entity';
import { CreateItinerarioDto } from './dto/create-itinerario.dto';
import { UpdateItinerarioDto } from './dto/update-itinerario.dto';

/**
 * Servicio para la gestión de itinerarios, zonas y guías asociados.
 * Proporciona operaciones CRUD completas con manejo de relaciones many-to-many.
 */
@Injectable()
export class ItinerariosService {
  constructor(
    @InjectRepository(Itinerario)
    private readonly itinerarioRepository: Repository<Itinerario>,
    @InjectRepository(Zona)
    private readonly zonaRepository: Repository<Zona>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    @InjectRepository(ItinerarioZona)
    private readonly itinerarioZonaRepository: Repository<ItinerarioZona>,
    @InjectRepository(GuiaItinerario)
    private readonly guiaItinerarioRepository: Repository<GuiaItinerario>,
  ) { }

  async create(createItinerarioDto: CreateItinerarioDto) {
    return 'WTF LO DIFICIL QUE ES :('
  }

  async findAll(): Promise<Itinerario[]> {
    return this.itinerarioRepository.find({
      where: { estado: true },
      relations: ['zonas.zona', 'guias.empleado'],
      order: { fecha: 'ASC', horaInicio: 'ASC' }, // Ordenar por fecha y hora
    });
  }

  async findOne(id: string): Promise<Itinerario> {
    const itinerario = await this.itinerarioRepository.findOne({
      where: { codigoIti: id},
      relations: ['zonas.zona', 'guias.empleado'],
});

    if (!itinerario) {
      throw new NotFoundException(`Itinerario con ID ${id} no encontrado`);
    }

    return itinerario;
  }

  
  async update(id: string, updateItinerarioDto: UpdateItinerarioDto){
    return 'HUY SKIBIDI ;[';
  }

  
  async remove(id: string) {
    return 'pipipi'
  }

}