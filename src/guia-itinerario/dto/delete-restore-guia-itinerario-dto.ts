import { IsString} from 'class-validator';

export class DeleteRestoreGuiaItinerarioDto {
    @IsString()
    idItinerario: string;

    @IsString()
    idGuia: string;
}
