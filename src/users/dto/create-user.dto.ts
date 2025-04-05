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
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    nameUser: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string; // Este se convertirá a varbinary con hash

    @IsUUID()
    @IsNotEmpty()
    rol: string; // UUID del rol

    @IsOptional()
    @IsBoolean()
    estadoUser?: boolean;
}