import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateHabitatContinenteDto {
    @IsString()
    habitatId: string;

    @IsInt()
    continenteId: number;

}