import { PartialType } from '@nestjs/mapped-types';
import { CreateCuidadorEspecieDto } from './create-cuidador-especie.dto';
import { IsString } from 'class-validator';

export class UpdateCuidadorEspecieDto extends PartialType(CreateCuidadorEspecieDto) {
        @IsString()
        idEmpleadoNuevo: string;

        @IsString()
        idEspecieNuevo: string
}
