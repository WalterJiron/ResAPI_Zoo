import { Injectable } from '@nestjs/common';
import { CreateGuiaItinerarioDto } from './dto/create-guia-itinerario.dto';
import { UpdateGuiaItinerarioDto } from './dto/update-guia-itinerario.dto';

@Injectable()
export class GuiaItinerarioService {
  create(createGuiaItinerarioDto: CreateGuiaItinerarioDto) {
    return 'This action adds a new guiaItinerario';
  }

  findAll() {
    return `This action returns all guiaItinerario`;
  }

  findOne(id: string) {
    return `This action returns a #${id} guiaItinerario`;
  }

  update(id: string, updateGuiaItinerarioDto: UpdateGuiaItinerarioDto) {
    return `This action updates a #${id} guiaItinerario`;
  }

  remove(id: string) {
    return `This action removes a #${id} guiaItinerario`;
  }

  restore(id: string) {
    return `This action removes a #${id} guiaItinerario`;
  }
}
