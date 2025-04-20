import { IsInt, IsString } from "class-validator";

export class DeleteRestoreHabitadContinenteDto {
    @IsString()
    idHabitat: string;

    @IsInt()
    idContinente: number;
}