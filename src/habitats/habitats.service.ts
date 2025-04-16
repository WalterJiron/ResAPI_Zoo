import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitat } from './entities/habitat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HabitatsService {
  constructor(
    @InjectRepository(Habitat)
    private readonly habitatRepository: Repository<Habitat>,
  ){}

  async create(createHabitatDto: CreateHabitatDto) {
    return 'This action adds a new habitat';
  }

  async findAll() {
    const habitats = await this.habitatRepository.find({
      relations: ['zona', 'continentes', 'especies'],
      order: { nombre: 'ASC' }, // Ordenar por nombre
    });

    if (!habitats) {
      throw new NotFoundException('No se encontraron habitats');
    }

    return habitats;
  }

  async findOne(id: number) {
    return `This action returns a #${id} habitat`;
  }

  async update(id: number, updateHabitatDto: UpdateHabitatDto) {
    return `This action updates a #${id} habitat`;
  }

  async remove(id: number) {
    return `This action removes a #${id} habitat`;
  }
}
