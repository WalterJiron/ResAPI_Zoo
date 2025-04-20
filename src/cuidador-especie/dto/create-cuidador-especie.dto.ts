import { IsDateString, IsNotEmpty, IsString } from 'class-validator';


export class CreateCuidadorEspecieDto {
    @IsString()    
    idEmpleado: string;
    
    @IsString()
    idEspecie: string;

    @IsDateString()
    @IsNotEmpty()
    fechaAsignacion: Date;
}
