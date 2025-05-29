// src/habitats/dto/create-habitat.dto.ts
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateHabitatDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    clima: string;

    @IsString()
    @IsNotEmpty()
    descripHabitat: string;

    @IsString()
    @IsNotEmpty()
    codigoZona: string;
}