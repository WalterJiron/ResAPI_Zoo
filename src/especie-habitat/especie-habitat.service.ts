import { Injectable } from '@nestjs/common';
import { CreateEspecieHabitatDto } from './dto/create-especie-habitat.dto';
import { UpdateEspecieHabitatDto } from './dto/update-especie-habitat.dto';

@Injectable()
export class EspecieHabitatService {
  create(createEspecieHabitatDto: CreateEspecieHabitatDto) {
    return 'This action adds a new especieHabitat';
  }

  findAll() {
    return `This action returns all especieHabitat`;
  }

  findOne(id: string) {
    return `This action returns a #${id} especieHabitat`;
  }

  update(id: string, updateEspecieHabitatDto: UpdateEspecieHabitatDto) {
    return `This action updates a #${id} especieHabitat`;
  }

  remove(id: string) {
    return `This action removes a #${id} especieHabitat`;
  }

  restore(id: string) {
    return `This action removes a #${id} especieHabitat`;
  }
}
