import { Injectable } from '@nestjs/common';
import { CreateItinerarioZonaDto } from './dto/create-itinerario-zona.dto';
import { UpdateItinerarioZonaDto } from './dto/update-itinerario-zona.dto';

@Injectable()
export class ItinerarioZonaService {
  create(createItinerarioZonaDto: CreateItinerarioZonaDto) {
    return 'This action adds a new itinerarioZona';
  }

  findAll() {
    return `This action returns all itinerarioZona`;
  }

  findOne(id: string) {
    return `This action returns a #${id} itinerarioZona`;
  }

  update(id: string, updateItinerarioZonaDto: UpdateItinerarioZonaDto) {
    return `This action updates a #${id} itinerarioZona`;
  }

  remove(id: string) {
    return `This action removes a #${id} itinerarioZona`;
  }

  restore(id: string) {
    return `This action removes a #${id} itinerarioZona`;
  }
}
