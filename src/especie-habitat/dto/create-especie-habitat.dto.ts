import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateEspecieHabitatDto {
    @IsString()
    especieId: string;

    @IsString()
    idespecieNueva: string

    @IsString()
    habitatId: string;

    @IsString()
    idHabitatNueva: string
}
