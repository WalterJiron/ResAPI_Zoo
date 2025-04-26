import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Zona } from './entities/zona.entity';
import { Repository } from 'typeorm';
import { ValidationService } from '../common/validation.services';

@Injectable()
export class ZonasService {
  constructor(
    @InjectRepository(Zona)
    private readonly zonaRepository: Repository<Zona>,
  ) { }

  async create(createZonaDto: CreateZonaDto): Promise<{ message: string }> {
    const result = await this.zonaRepository.query(`
            DECLARE @Mensaje AS NVARCHAR(100)
            EXEC ProcInsertZona
              @NameZona = @0,
              @Extension = @1,
              @Mensaje = @Mensaje OUTPUT
            SELECT @Mensaje AS message;
      `, [
      createZonaDto.nameZona,
      createZonaDto.extension
    ]
    );

    return ValidationService.verifiedResult(result, 'correctamente');

  }

  async findAll() {
    const zonas = await this.zonaRepository.find();

    if (!zonas.length) {
      throw new NotFoundException('No hay zonas disponobles.');
    }

    return zonas;
  }

  async findOne(id: string) {
    const zona = await this.zonaRepository.findOne({ where: { codigoZona: id } });

    if (!zona) {
      throw new BadRequestException(`La zona con el codigo: ${id} no existe en la base de datos.`);
    }

    return zona;
  }

  async update(id: string, updateZonaDto: UpdateZonaDto): Promise<{ message: string }> {
    const result = await this.zonaRepository.query(`
            DECLARE @Mensaje AS NVARCHAR(100)
            EXEC ProcUpdateZona
              @CodigoZona = @0,
              @NameZona = @1,
              @Extension = @2,
              @Mensaje = @Mensaje OUTPUT
            SELECT @Mensaje AS message;
      `, [
      id,
      updateZonaDto.nameZona,
      updateZonaDto.extension
    ]
    );

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.zonaRepository.query(`
            DECLARE @Mensaje AS NVARCHAR(100)
            EXEC ProcDeleteZona
              @CodigoZona = @0,
              @Mensaje = @Mensaje OUTPUT
            SELECT @Mensaje AS message;
      `, [id]);

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async restore(id: string): Promise<{ message: string }> {
    const result = await this.zonaRepository.query(`
            DECLARE @Mensaje AS NVARCHAR(100)
            EXEC ProcRestoreZona
              @CodigoZona = @0,
              @Mensaje = @Mensaje OUTPUT
            SELECT @Mensaje AS message;
      `, [id]);

    return ValidationService.verifiedResult(result, 'correctamente');
  }

}
