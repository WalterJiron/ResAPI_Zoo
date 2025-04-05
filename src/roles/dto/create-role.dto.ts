import { 
    IsString, 
    IsNotEmpty, 
    MaxLength, 
    IsOptional, 
    IsBoolean 
} from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    nombreRol: string;

    @IsString()
    @IsNotEmpty()
    descripRol: string;

    @IsOptional()
    @IsBoolean()
    estadoRol?: boolean;
}