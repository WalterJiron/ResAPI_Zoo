import { HabitatContinente } from 'src/habitat-continente/entities/habitat-continente.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'Continente' }) 
export class Continente {
    @PrimaryGeneratedColumn('increment', { name: 'IdCont' })
    idCont: number;

    @Column({ name: 'Nombre', type: 'nvarchar', length: 50 })
    nombre: string;

    // Para las tablas de muchos a muchos
    @OneToMany(() => HabitatContinente, habitatContinente => habitatContinente.continente)
    habitats: HabitatContinente[];
} 
