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

  findOne(id: number) {
    return `This action returns a #${id} especieHabitat`;
  }

  update(id: number, updateEspecieHabitatDto: UpdateEspecieHabitatDto) {
    return `This action updates a #${id} especieHabitat`;
  }

  remove(id: number) {
    return `This action removes a #${id} especieHabitat`;
  }
}
