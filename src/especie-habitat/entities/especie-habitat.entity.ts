import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Especie } from '../../especie/entities/especie.entity';
import { Habitat } from '../../habitats/entities/habitat.entity';

@Entity({ name: 'EspecieHabitat' })
export class EspecieHabitat {
    @PrimaryColumn({ name: 'Especie', type: 'uniqueidentifier' })
    especieId: string;

    @PrimaryColumn({ name: 'Habitat', type: 'uniqueidentifier' })
    habitatId: string;

    @ManyToOne(() => Especie, especie => especie.habitats)
    @JoinColumn({ name: 'Especie' })
    especie: Especie;

    @ManyToOne(() => Habitat, habitat => habitat.especies)
    @JoinColumn({ name: 'Habitat' })
    habitat: Habitat;

    @Column({ name: 'DateCreate', type: 'datetime' })
    dateCreate: Date;

    @Column({ name: 'DateDelete', type: 'datetime', nullable: true })
    dateDelete: Date | null;

    @Column({ name: 'EstadoEH', type: 'bit', default: true })
    estadoEH: boolean;
}