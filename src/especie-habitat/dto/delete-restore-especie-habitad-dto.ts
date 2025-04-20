import {IsString} from 'class-validator';

export class DeleteRestoreEspecieHabitatDto {
    @IsString()
    idEspecie: string;

    @IsString()
    idHabitat: string;
}