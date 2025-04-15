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

  findOne(id: number) {
    return `This action returns a #${id} guiaItinerario`;
  }

  update(id: number, updateGuiaItinerarioDto: UpdateGuiaItinerarioDto) {
    return `This action updates a #${id} guiaItinerario`;
  }

  remove(id: number) {
    return `This action removes a #${id} guiaItinerario`;
  }
}
