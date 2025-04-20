import {IsString} from 'class-validator';

export class DeleteRestoreItinerarioZonaDto {
    @IsString()
    idItinerario: string

    @IsString()
    idZona: string
}