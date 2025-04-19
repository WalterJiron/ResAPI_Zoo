import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuidadorEspecieDto } from './dto/create-cuidador-especie.dto';
import { UpdateCuidadorEspecieDto } from './dto/update-cuidador-especie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CuidadorEspecie } from './entities/cuidador-especie.entity';
import { Repository } from 'typeorm';

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



  async update(id: number, updateCuidadorEspecieDto: UpdateCuidadorEspecieDto) {
    return `This action updates a #${id} cuidadorEspecie`;
  }

  async remove(id: number) {
    return `This action removes a #${id} cuidadorEspecie`;
  }
}
