import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuiaItinerarioDto } from './dto/create-guia-itinerario.dto';
import { UpdateGuiaItinerarioDto } from './dto/update-guia-itinerario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GuiaItinerario } from './entities/guia-itinerario.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/common/validation.services';

@Injectable()
export class GuiaItinerarioService {
  constructor(
    @InjectRepository(GuiaItinerario)
      private readonly GuiaItinerarioRepository :Repository<GuiaItinerario>,
      ){ }

      async create(GuiaItinerarioDto: CreateGuiaItinerarioDto) {
        const Result = await this.GuiaItinerarioRepository.query(`
          DECLARE @Mensaje AS VARCHAR(100)
          EXEC INSERTAR_GUIA_ITINERARIO
              @IdEmpleado = @0,
              @IdItinerario = @1,
              @MENSAJE = @Mensaje OUTPUT
          SELECT @Mensaje AS message
          `,[
            GuiaItinerarioDto.empleadoId,
            GuiaItinerarioDto.itinerarioId
          ]);

          return ValidationService.verifiedResult(Result, 'correctamente');
      }
  async findAll() {
    const GuiaItinerario = await this.GuiaItinerarioRepository.find();
    
    if(!GuiaItinerario){
      throw new NotFoundException (`No se encontro la relacion`);
    }

    return GuiaItinerario;
  }

  async findOne(id: string) {
    const Guia_Itinerario =await this.GuiaItinerarioRepository.findOne({where: {empleadoId: id}}
    );

    if(!Guia_Itinerario){
      throw new BadRequestException (`No se encontro la relacion con el id ${id}`);
    }
    
    return Guia_Itinerario;
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
