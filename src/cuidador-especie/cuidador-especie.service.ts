import { Injectable, NotFoundException } from '@nestjs/common';
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
    return 'This action adds a new cuidadorEspecie';
  }

  async findAll() {
    const cuidadoresEspecies = await this.cuidadorEspecieRepository.find();

    if(!cuidadoresEspecies){
      throw new NotFoundException('No se encontraron cuidadores de especies');
    }

    return cuidadoresEspecies
  }

  async findOne(id: number) {
    return `This action returns a #${id} cuidadorEspecie`;
  }

  async update(id: number, updateCuidadorEspecieDto: UpdateCuidadorEspecieDto) {
    return `This action updates a #${id} cuidadorEspecie`;
  }

  async remove(id: number) {
    return `This action removes a #${id} cuidadorEspecie`;
  }
}
