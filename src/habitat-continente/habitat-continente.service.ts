import { Injectable } from '@nestjs/common';
import { CreateHabitatContinenteDto } from './dto/create-habitat-continente.dto';
import { UpdateHabitatContinenteDto } from './dto/update-habitat-continente.dto';

@Injectable()
export class HabitatContinenteService {
  create(createHabitatContinenteDto: CreateHabitatContinenteDto) {
    return 'This action adds a new habitatContinente';
  }

  findAll() {
    return `This action returns all habitatContinente`;
  }

  findOne(id: string) {
    return `This action returns a #${id} habitatContinente`;
  }

  update(id: string, updateHabitatContinenteDto: UpdateHabitatContinenteDto) {
    return `This action updates a #${id} habitatContinente`;
  }

  remove(id: string) {
    return `This action removes a #${id} habitatContinente`;
  }

  restore(id: string) {
    return `This action restore a #${id} habitatContinente`;
  }
}
