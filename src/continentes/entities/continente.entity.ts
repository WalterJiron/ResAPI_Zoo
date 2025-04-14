import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Continente' }) 
export class Continente {
    @PrimaryGeneratedColumn('increment', { name: 'IdCont' })
    idCont: number;

    @Column({ name: 'Nombre', type: 'nvarchar', length: 50 })
    nombre: string;
} 
