import { IsDate, IsString } from 'class-validator';

export class CreateCuidadorEspecieDto {
    @IsString()    
    idEmpleado: string;
    
    @IsString()
    idEspecie: string;

    @IsDate()
    fechaAsignacion: Date;
}
