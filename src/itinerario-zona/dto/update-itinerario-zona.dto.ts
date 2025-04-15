import { PartialType } from '@nestjs/mapped-types';
import { CreateItinerarioZonaDto } from './create-itinerario-zona.dto';

export class UpdateItinerarioZonaDto extends PartialType(CreateItinerarioZonaDto) {}
