import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateGuiaItinerarioDto {
    @IsString()
    empleadoId: string;

    @IsString()
    itinerarioId: string;

    @IsBoolean()
    @IsOptional()
    estadoGI?: boolean;
}