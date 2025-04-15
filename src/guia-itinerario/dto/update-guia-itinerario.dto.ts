import { PartialType } from '@nestjs/mapped-types';
import { CreateGuiaItinerarioDto } from './create-guia-itinerario.dto';

export class UpdateGuiaItinerarioDto extends PartialType(CreateGuiaItinerarioDto) {}
