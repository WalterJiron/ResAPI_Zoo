import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Habitat } from '../../habitats/entities/habitat.entity';
import { Continente } from '../../continentes/entities/continente.entity';

@Entity({ name: 'HabitatContinente' })
export class HabitatContinente {
    @PrimaryColumn({ name: 'Habitat', type: 'uniqueidentifier' })
    habitatId: string;

    @PrimaryColumn({ name: 'Cont', type: 'int' })
    continenteId: number;

    @ManyToOne(() => Habitat, habitat => habitat.continentes)
    @JoinColumn({ name: 'Habitat' })
    habitat: Habitat;

    @ManyToOne(() => Continente, continente => continente.habitats, { eager: true })
    @JoinColumn({ name: 'Cont' })
    continente: Continente;

    @Column({ name: 'DateCreate', type: 'datetime' })
    dateCreate: Date;

    @Column({ name: 'EstadoHC', type: 'bit', default: true })
    estadoHC: boolean;
}
