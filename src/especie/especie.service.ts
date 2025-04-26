import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Especie } from './entities/especie.entity';
import { Repository } from 'typeorm';
import { ValidationService } from '../common/validation.services';

@Injectable()
export class EspecieService {
  constructor(
    @InjectRepository(Especie)
    private readonly especieRepository: Repository<Especie>,
  ) { }

  async create(createEspecieDto: CreateEspecieDto): Promise<{ message: string; code?: string }> {
    const result = await this.especieRepository.query(`
          DECLARE @Mensaje AS NVARCHAR(100), @CodigoEspecie AS UNIQUEIDENTIFIER;

          EXEC ProcInsertEspecie
            @Nombre = @0,
            @NombreCientifico = @1,
            @Descripcion = @2,
            @Mensaje = @Mensaje OUTPUT,
            @IDEspecie = @CodigoEspecie OUTPUT;

          SELECT @Mensaje AS message, @CodigoEspecie AS code;
      `, [
      createEspecieDto.nombre,
      createEspecieDto.nameCientifico,
      createEspecieDto.descripcion
    ]
    );

    return ValidationService.verifiedResultForID(result, 'correctamente');
  }

  async findAll() {
    const especies = await this.especieRepository.find();

    if (!especies.length) {
      throw new NotFoundException('No hay especies disponibles.');
    }

    return especies
  }

  async findOne(id: string) {
    const especie = await this.especieRepository.findOne({
      where: { codigoEspecie: id }
    });

    if (!especie) {
      throw new NotFoundException('No se encontro la especie con ese codigo.')
    }

    return especie;
  }

  async update(id: string, updateEspecieDto: UpdateEspecieDto): Promise<{ message: string }> {
    const result = await this.especieRepository.query(`
            DECLARE @Mensaje AS NVARCHAR(100);

            EXEC ProcUpdateEspecie
                @CodigoEspecie = @0,
                @NuevoNombre = @1,
                @NuevoCientifico @2,
                @NuevaDescripcion @3,
                @Mensaje = @Mensaje OUTPUT;

            SELECT @Mensaje AS message;
      `, [
      id,
      updateEspecieDto.nombre,
      updateEspecieDto.nameCientifico,
      updateEspecieDto.descripcion
    ]);

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.especieRepository.query(`
              DECLARE @Mensaje AS NVARCHAR(100);

              EXEC ProcDeleteEspecie 
                  @CodigoEspecie = @0,
                  @Mensaje = @Mensaje OUTPUT;

              SELECT @Mensaje AS message;
      `, [id]);

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async restore(id: string): Promise<{ message: string }> {
    const result = await this.especieRepository.query(`
              DECLARE @Mensaje AS NVARCHAR(100);

              EXEC ProcRestoreEspecie
                  @CodigoEspecie = @0,
                  @Mensaje = @Mensaje OUTPUT;

              SELECT @Mensaje AS message;
      `, [id]);

    return ValidationService.verifiedResult(result, 'correctamente');
  }

}
