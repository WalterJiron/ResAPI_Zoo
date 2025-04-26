import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Continente } from './entities/continente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContinentesService {
  constructor(
    @InjectRepository(Continente)
    private readonly continenteRepositori: Repository<Continente>,
  ) { }

  async findAll() {
    const continentes = await this.continenteRepositori.find();

    if (!continentes.length){
      throw new NotFoundException('No existen continentes.');
    }

    return continentes;
  }

  async findOne(id: number) {
    const continente = await this.continenteRepositori.findOne( { where: { idCont: id } } );

    if (!continente){
      throw new NotFoundException('No existe continente con ese id.');
    }
  }
}
