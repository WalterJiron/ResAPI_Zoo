import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitatContinenteDto } from './create-habitat-continente.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateHabitatContinenteDto extends PartialType(CreateHabitatContinenteDto) {

    @IsString()
    idHabitadNueva: String;

    @IsInt()
    idContinenteNuevo: number;
}
