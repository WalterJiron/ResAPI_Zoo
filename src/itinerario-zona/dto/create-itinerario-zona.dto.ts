import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateItinerarioZonaDto {
    @IsString()
    itinerarioId: string;

    @IsString()
    idItinerarioNueva: string;

    @IsString()
    zonaId: string;

    @IsString()
    idZonaNueva: string;
}