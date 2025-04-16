import { PartialType } from '@nestjs/mapped-types';
import { CreateCuidadorEspecieDto } from './create-cuidador-especie.dto';

export class UpdateCuidadorEspecieDto extends PartialType(CreateCuidadorEspecieDto) {}
