import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecieHabitatDto } from './dto/create-especie-habitat.dto';
import { UpdateEspecieHabitatDto } from './dto/update-especie-habitat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EspecieHabitat } from './entities/especie-habitat.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class EspecieHabitatService {
  constructor(
    @InjectRepository(EspecieHabitat)
    private readonly especie_hbitatRepository: Repository<EspecieHabitat>,
  ){}

  async create(createEspecieHabitatDto: CreateEspecieHabitatDto) {
    return 'This action adds a new especieHabitat';
  }

  async findAll() {
    const especies_habitats = await this.especie_hbitatRepository.find();

    if(!especies_habitats){
      throw new NotFoundException('No se encontraron uniones.');
    }

    return especies_habitats;
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('El parámetro debe ser un UUID válido');
    }
    return `This action returns a #${id} especieHabitat`;
  }

  async update(id: string, updateEspecieHabitatDto: UpdateEspecieHabitatDto) {
    return `This action updates a #${id} especieHabitat`;
  }

  async remove(id: string) {
    return `This action removes a #${id} especieHabitat`;
  }

  async restore(id: string) {
    return `This action removes a #${id} especieHabitat`;
  }
}
