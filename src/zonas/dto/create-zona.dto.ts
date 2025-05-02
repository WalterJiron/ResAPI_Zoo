// src/zonas/dto/create-zona.dto.ts
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsDecimal, MaxLength } from 'class-validator';

export class CreateZonaDto {
    @Transform(({ value }) => value?.trim())
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nameZona: string;

    @Transform(({ value }) => value?.trim())
    @IsDecimal({ decimal_digits: '2' })
    @IsNotEmpty()
    extension: number;
}