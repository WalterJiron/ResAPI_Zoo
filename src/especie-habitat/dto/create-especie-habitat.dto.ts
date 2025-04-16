import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateEspecieHabitatDto {
    @IsString()
    especieId: string;

    @IsString()
    habitatId: string;
}
