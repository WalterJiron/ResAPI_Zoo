import { PartialType } from '@nestjs/mapped-types';
import { CreateItinerarioZonaDto } from './create-itinerario-zona.dto';
import { IsString } from 'class-validator';

export class UpdateItinerarioZonaDto extends PartialType(CreateItinerarioZonaDto) {

    @IsString()
    idItinerarioNuevo: string

    @IsString()
    idZonaNueva: string

}
