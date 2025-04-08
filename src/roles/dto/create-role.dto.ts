import { Transform } from 'class-transformer';
import { 
    IsString, 
    IsNotEmpty, 
    MaxLength, 
    IsOptional, 
    IsBoolean 
} from 'class-validator';

export class CreateRoleDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    nombreRol: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    descripRol: string;

    @IsOptional()
    @IsBoolean()
    estadoRol?: boolean;
}