import { IsDate, IsString } from 'class-validator';

export class CreateCuidadorEspecieDto {
    @IsString()    
    idEmpleado: string;

    @IsString()
    idEmpleadoNuevo: string;
    
    @IsString()
    idEspecie: string;

    @IsString()
    idEspecieNuevo: string;

    @IsDate()
    fechaAsignacion: Date;
}
