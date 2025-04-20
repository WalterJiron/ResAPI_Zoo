import { IsString } from 'class-validator'

export class DeleteRestoreCuidadorEspecieDto {
    @IsString()
    idCuidador :string;

    @IsString()
    idEspecie :string;
}