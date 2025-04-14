import { IsString, IsNumber, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreateItinerarioDto {
    @IsString()
    duracion: string;

    @IsNumber()
    longitud: number;

    @IsNumber()
    maxVisitantes: number;

    @IsNumber()
    numEspecies: number;

    @IsDateString()
    fecha: Date;

    @IsString()
    horaInicio: string;

    @IsBoolean()
    @IsOptional()
    estado?: boolean;

    @IsString({ each: true })
    zonas: string[]; // IDs de las zonas

    @IsString({ each: true })
    guias: string[]; // IDs de los guías
}