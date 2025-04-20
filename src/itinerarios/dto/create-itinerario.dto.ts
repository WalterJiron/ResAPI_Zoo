import { IsString, IsNumber, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreateItinerarioDto {
    @IsString()
    duracion: string;   // Format: 'HH:mm:ss'

    @IsNumber()
    longitud: number;

    @IsNumber()
    maxVisitantes: number;

    @IsNumber()
    numEspecies: number;

    @IsDateString()
    fecha: Date;

    @IsString()
    horaInicio: string;   // Format: 'HH:mm:ss'

    @IsBoolean()
    @IsOptional()
    estado?: boolean;
}