import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecieHabitatDto } from './create-especie-habitat.dto';

export class UpdateEspecieHabitatDto extends PartialType(CreateEspecieHabitatDto) {}
