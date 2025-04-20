import { PartialType } from '@nestjs/mapped-types';
import { CreateGuiaItinerarioDto } from './create-guia-itinerario.dto';
import { IsString } from 'class-validator';


export class UpdateGuiaItinerarioDto extends PartialType(CreateGuiaItinerarioDto) {
    
    @IsString()
    idItinerarioNuevo: string;

    @IsString()
    idEmpleadoNuevo: string;
}
