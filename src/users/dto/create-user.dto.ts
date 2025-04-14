import { Transform } from 'class-transformer';
import { 
    IsString, 
    IsNotEmpty, 
    MaxLength, 
    IsEmail, 
    IsBoolean, 
    IsUUID, 
    IsOptional 
} from 'class-validator';

export class CreateUserDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    nameUser: string;

    @Transform(({ value }) => value.trim())
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    password: string; 

    @Transform(({ value }) => value.trim())  // elimina espacios en blanco del inicio y el final
    @IsUUID()
    @IsNotEmpty()
    rol: string; // UUID del rol

    @IsOptional()
    @IsBoolean()
    estadoUser?: boolean;
}