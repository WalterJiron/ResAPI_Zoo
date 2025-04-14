import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateEspecieDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nameCientifico: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    descripcion: string;
}