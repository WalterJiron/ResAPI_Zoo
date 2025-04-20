import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateItinerarioZonaDto {
    @IsString()
    itinerarioId: string;

    @IsString()
    zonaId: string;

}