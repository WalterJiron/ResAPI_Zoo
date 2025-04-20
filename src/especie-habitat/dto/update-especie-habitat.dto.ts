import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecieHabitatDto } from './create-especie-habitat.dto';
import { IsString } from 'class-validator';

export class UpdateEspecieHabitatDto extends PartialType(CreateEspecieHabitatDto) {
    @IsString()
    idEspecieNuevo: string

    @IsString()
    idHabitatNuevo: string
}
