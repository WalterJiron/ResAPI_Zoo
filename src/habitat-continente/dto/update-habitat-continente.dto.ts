import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitatContinenteDto } from './create-habitat-continente.dto';

export class UpdateHabitatContinenteDto extends PartialType(CreateHabitatContinenteDto) {}
