import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateHabitatContinenteDto {
    @IsString()
    habitatId: string;

    @IsString()
    idHabitatNueva: string;

    @IsInt()
    continenteId: number;

    @IsString()
    idContinenteNueva: string;

    @IsBoolean()
    @IsOptional()
    estadoHC?: boolean;
}