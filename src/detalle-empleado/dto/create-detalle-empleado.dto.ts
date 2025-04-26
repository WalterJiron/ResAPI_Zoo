import { Transform } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    IsDateString,
    IsIn,
    Matches,
    IsUUID
} from 'class-validator';

export class CreateDetalleEmpleadoDto {
    @Transform(({ value }) => value.trim())
    @IsUUID()
    @IsNotEmpty()
    codigEmpleado: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]$/, {
        message: 'La cedula debe tener el formato 000-000000-0000A'
    })
    cedula: string;

    @IsDateString()
    @IsNotEmpty()
    fechaNacimiento: Date;

    @Transform(({ value }) => value.trim().toUpperCase())
    @IsString()
    @IsNotEmpty()
    @IsIn(['M', 'F', 'O'], {
        message: 'El genero debe ser M, F u O'
    })
    genero: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @IsIn(['Soltero', 'Casado', 'Divorciado', 'Viudo', 'Union Libre'], {
        message: 'Estado civil no valido'
    })
    estadoCivil: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @Matches(/^0[0-9]{8}$/, {
        message: 'El INSS debe tener 9 dígitos comenzando con 0'
    })
    INSS: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @Matches(/^[2|5|7|8][0-9]{7}$/, {
        message: 'El teléfono debe tener 8 dígitos comenzando con 2,5,7 u 8'
    })
    telefonoEmergencia: string;

}