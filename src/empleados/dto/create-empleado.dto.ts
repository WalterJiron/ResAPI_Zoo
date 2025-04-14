import { IsString, IsNotEmpty, IsEmail, IsDateString, Length, Matches, IsOptional } from 'class-validator';

export class CreateEmpleadoDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 25)
    pne: string;

    @IsString()
    @IsOptional()
    @Length(1, 25)
    sne?: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 25)
    pae: string;

    @IsString()
    @IsOptional()
    @Length(1, 25)
    sae?: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 200)
    direccionE: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 8)
    @Matches(/^[2|5|7|8][0-9]{7}$/, {
        message: 'El teléfono debe comenzar con 2,5,7 u 8 y tener 8 dígitos'
    })
    telefonoE: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Length(1, 100)
    emailE: string;

    @IsDateString()
    @IsNotEmpty()
    fechaIngreso: Date;

    @IsString()
    @IsNotEmpty()
    idCargo: string;
}