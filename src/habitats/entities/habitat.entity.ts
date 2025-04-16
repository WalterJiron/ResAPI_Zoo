import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Zona } from '../../zonas/entities/zona.entity';
import { HabitatContinente } from '../../habitat-continente/entities/habitat-continente.entity';
import { EspecieHabitat } from '../../especie-habitat/entities/especie-habitat.entity';

@Entity({ name: 'Habitat' })
export class Habitat {
    @PrimaryColumn({
        name: 'CodigoHabitat',
        type: 'uniqueidentifier',
        default: () => 'NEWID()'
    })
    codigoHabitat: string;

    @Column({ name: 'Nombre', type: 'varchar', length: 100 })
    nombre: string;

    @Column({ name: 'Clima', type: 'varchar', length: 100 })
    clima: string;

    @Column({ name: 'DescripHabitat', type: 'varchar', length: 'max' })
    descripHabitat: string;

    // Uniono de  muchos a uno
    @ManyToOne(() => Zona, zona => zona.habitats, { eager: true })
    @JoinColumn({ name: 'CodigoZona' })
    zona: Zona;

    @CreateDateColumn({ name: 'DateCreate', type: 'datetime' })
    dateCreate: Date;

    @DeleteDateColumn({ name: 'DateDelete', type: 'datetime', nullable: true })
    dateDelete: Date | null;

    @Column({ name: 'EstadoHabitat', type: 'bit', default: true })
    estadoHabitat: boolean;

    //------------- UNION DE MUCHOS A MUCHOS -------------//
    @OneToMany(() => HabitatContinente, habitatContinente => habitatContinente.habitat,)
    continentes: HabitatContinente[];

    @OneToMany(() => EspecieHabitat, especieHabitat => especieHabitat.habitat, { eager: true })
    especies: EspecieHabitat[];
}