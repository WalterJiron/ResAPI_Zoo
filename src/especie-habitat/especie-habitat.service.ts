import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecieHabitatDto } from './dto/create-especie-habitat.dto';
import { UpdateEspecieHabitatDto } from './dto/update-especie-habitat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EspecieHabitat } from './entities/especie-habitat.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/common/validation.services';
import { DeleteRestoreEspecieHabitatDto } from './dto/delete-restore-especie-habitad-dto';

@Injectable()
export class EspecieHabitatService {
  constructor(
    @InjectRepository(EspecieHabitat)
    private readonly especie_hbitatRepository: Repository<EspecieHabitat>,
  ){}

  async create(createEspecieHabitatDto: CreateEspecieHabitatDto): Promise<{message: string}> {
    const result = await this.especie_hbitatRepository.query(`
              DECLARE @Mensaje AS VARCHAR(100);

                EXEC INSERTAR_ESPECIEHABITAD
                    @ESPECIE = @0,
                    @HABITAD = @1,
                    @Mensaje = @Mensaje OUTPUT;
                    
                SELECT @Mensaje AS message;
      `,[
        createEspecieHabitatDto.especieId,
        createEspecieHabitatDto.habitatId,
      ]);

    return ValidationService.verifiedResult(result, 'realizada');
  }

  async findAll() {
    const especies_habitats = await this.especie_hbitatRepository.find();

    if(!especies_habitats.length){
      throw new NotFoundException('No se encontraron uniones.');
    }

    return especies_habitats;
  }

  async findOne(id: string) {
    const especie_habitat = await this.especie_hbitatRepository.findOne({
        where: { especieId : id}}
      );

    if(!especie_habitat){
      throw new BadRequestException(`no se encontro la union de especie con el codigo: ${id}`);
    }

    return especie_habitat;
  }

  async update( updateEspecieHabitatDto: UpdateEspecieHabitatDto): Promise<{message: string}> {
    const result  = await this.especie_hbitatRepository.query(`
              DECLARE @MENSAJE AS NVARCHAR(100);

              EXEC UPDATE_ESPECIEHABITAD
                @IDESPECIE_VIEJO = @0,
                @IDHABITAD_VIEJO =@1,
                @ESPECIE =@2,
                @HABITAD =@3,
                @MENSAJE = @MENSAJE OUTPUT;
                
              SELECT @MENSAJE AS message;
      `,[
        updateEspecieHabitatDto.especieId,
        updateEspecieHabitatDto.habitatId,
        updateEspecieHabitatDto.idEspecieNuevo,
        updateEspecieHabitatDto.idHabitatNuevo
      ])
    return ValidationService.verifiedResult(result, 'relacion');
  }

  async remove(deleteEspecieHabitatDto: DeleteRestoreEspecieHabitatDto): Promise<{message: string}> {
    const result = await this.especie_hbitatRepository.query(`
              DECLARE @MENSAJE AS VARCHAR(100);
            
              EXEC Desactivar_EspecieHabitat
                  @Especie = @0,
                  @Habitat = @1,
                  @MENSAJE = @MENSAJE OUTPUT;
                  
              SELECT @MENSAJE AS message;
      `,[
        deleteEspecieHabitatDto.idEspecie,
        deleteEspecieHabitatDto.idHabitat
      ])
    return ValidationService.verifiedResult(result, 'exito');
  }

  async restore(restoreCuidadorEspecieDto: DeleteRestoreEspecieHabitatDto): Promise<{message: string}> {
    const result  = await this.especie_hbitatRepository.query(`
              DECLARE @MENSAJE AS NVARCHAR(100);

              EXEC Activar_EspecieHabitat
                  @Especie = @0,
                  @Habitat = @1,
                  @MENSAJE = @MENSAJE OUTPUT;
                  
              SELECT @MENSAJE AS message;
      `,[
        restoreCuidadorEspecieDto.idEspecie,
        restoreCuidadorEspecieDto.idHabitat
      ])
    return ValidationService.verifiedResult(result, 'exito');
  }
}
