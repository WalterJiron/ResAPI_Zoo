// src/habitats/dto/create-habitat.dto.ts
import { IsString, IsNotEmpty, IsBoolean, IsOptional, MaxLength, IsNumber } from 'class-validator';

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

    @IsBoolean()
    @IsOptional()
    estadoHabitat?: boolean;

    @IsNumber({}, { each: true })
    continentesIds?: number[];

    @IsString({ each: true })
    especiesIds?: string[];
}