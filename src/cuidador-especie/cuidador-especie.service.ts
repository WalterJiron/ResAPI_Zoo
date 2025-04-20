import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuidadorEspecieDto } from './dto/create-cuidador-especie.dto';
import { UpdateCuidadorEspecieDto } from './dto/update-cuidador-especie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CuidadorEspecie } from './entities/cuidador-especie.entity';
import { Repository } from 'typeorm';
import { ValidationService } from '../common/validation.services';
import {DeleteRestoreCuidadorEspecieDto} from './dto/delete-restore-cuidador-especie-dto';
@Injectable()
export class CuidadorEspecieService {
  constructor(
    @InjectRepository(CuidadorEspecie)
    private readonly cuidadorEspecieRepository: Repository<CuidadorEspecie>,
  ){}
  async create(createCuidadorEspecieDto: CreateCuidadorEspecieDto) {
    const result = await this.cuidadorEspecieRepository.query(`
      DECLARE @Mensaje AS VARCHAR(100)
      EXEC Insertar_Cuidador_Especie
          @IdEmpleado = @0,
          @IdEspecie = @1,
          @FechaAsignacion =@2,
          @MENSAJE = @mensaje OUTPUT
      SELECT @Mensaje AS message
      `,[
        createCuidadorEspecieDto.idEmpleado,
        createCuidadorEspecieDto.idEspecie,
        createCuidadorEspecieDto.fechaAsignacion,
      ]);

      return ValidationService.verifiedResult(result, 'exito');
  }

  async findAll() {
    const cuidadoresEspecies = await this.cuidadorEspecieRepository.find();

    if(!cuidadoresEspecies){
      throw new NotFoundException('No se encontraron cuidadores de especies');
    }

    return cuidadoresEspecies
  }

  async findOne(id: string) {
    const cuidadorEspecie = await this.cuidadorEspecieRepository.findOne({ where: { idEmpleado: id } });
    
    if(!cuidadorEspecie){
      throw new BadRequestException(`No se encontro una union con el id del cuidador :${id}`);
    }

    return cuidadorEspecie;
  }



  async update( updateCuidadorEspecieDto: UpdateCuidadorEspecieDto) {
    const result = await this.cuidadorEspecieRepository.query(`
      DECLARE @MENSAJE AS VARCHAR(100)
      EXEC Actualizar_Cuidador_Especie
        @IDEMPLEADO_VIEJO = @0,
        @IDESPECIE_VIEJO = @1,
        @IdEmpleado = @2,
        @IdEspecie = @3,
        @FechaAsignacion = @4,
        @MENSAJE = @MENSAJE OUTPUT
      SELECT @MENSAJE AS message;
      `,[
        updateCuidadorEspecieDto.idEmpleado,
        updateCuidadorEspecieDto.idEspecie,
        updateCuidadorEspecieDto.idEmpleadoNuevo,
        updateCuidadorEspecieDto.idEspecieNuevo,
        updateCuidadorEspecieDto.fechaAsignacion
      ]);

    return ValidationService.verifiedResult(result, 'exito');
  }

async remove(deleteRestoreCuidadorEspecieDto: DeleteRestoreCuidadorEspecieDto) {
    const result  = await this.cuidadorEspecieRepository.query(`
      DECLARE @MENSAJE AS NVARCHAR(100)
      EXEC Eliminar_CuidadorEspecie
          @IdEmpleado = @0,
          @IdEspecie = @1,
          @MENSAJE = @MENSAJE OUTPUT 
      SELECT @MENSAJE AS message
      `,[
        deleteRestoreCuidadorEspecieDto.idCuidador,
        deleteRestoreCuidadorEspecieDto.idEspecie
      ]
      )
    return ValidationService.verifiedResult(result, 'exito');
  }

  async restore(restoreCuidadorEspecieDto: DeleteRestoreCuidadorEspecieDto) {
    const result  = await this.cuidadorEspecieRepository.query(`
      DECLARE @MENSAJE AS NVARCHAR(100)
      EXEC Activar_CuidadorEspecie
          @IdEmpleado = @0,
          @IdEspecie = @1,
          @MENSAJE = @MENSAJE OUTPUT 
      SELECT @MENSAJE AS message
      `,[
        restoreCuidadorEspecieDto.idCuidador,
        restoreCuidadorEspecieDto.idEspecie
      ])
    return ValidationService.verifiedResult(result, 'exito');
  }
}
