import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecieHabitatDto } from './dto/create-especie-habitat.dto';
import { UpdateEspecieHabitatDto } from './dto/update-especie-habitat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EspecieHabitat } from './entities/especie-habitat.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/common/validation.services';

@Injectable()
export class EspecieHabitatService {
  constructor(
    @InjectRepository(EspecieHabitat)
    private readonly especie_hbitatRepository: Repository<EspecieHabitat>,
  ){}

  async create(createEspecieHabitatDto: CreateEspecieHabitatDto) {
    const result = await this.especie_hbitatRepository.query(`
      DECLARE @Mensaje AS VARCHAR(100)
        EXEC INSERTAR_ESPECIEHABITAD
            @ESPECIE = @0,
            @HABITAD = @1,
            @Mensaje = @Mensaje OUTPUT
        SELECT @Mensaje AS message;
      `,[
        createEspecieHabitatDto.especieId,
        createEspecieHabitatDto.habitatId,
      ]);

    return ValidationService.verifiedResult(result, 'realizada');
  }

  async findAll() {
    const especies_habitats = await this.especie_hbitatRepository.find();

    if(!especies_habitats){
      throw new NotFoundException('No se encontraron uniones.');
    }

    return especies_habitats;
  }

  async findOne(id: string) {
    const especie_habitat = await this.especie_hbitatRepository.findOne({
       where: { especieId : id}}
      );

    if(!especie_habitat){
      throw new BadRequestException(`no se encotro la union de especie con el codigo: ${id}`);
    }

    return especie_habitat;
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
