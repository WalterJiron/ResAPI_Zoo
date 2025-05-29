import { Entity, Column, PrimaryColumn, CreateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { ItinerarioZona } from '../../itinerario-zona/entities/itinerario-zona.entity';
import { Habitat } from 'src/habitats/entities/habitat.entity';

@Entity({ name: 'Zona' })
export class Zona {
    @PrimaryColumn({
        name: 'CodigoZona',
        type: 'uniqueidentifier',
        default: () => 'NEWID()'
    })
    codigoZona: string;

    @Column({ name: 'NameZona', type: 'nvarchar', length: 100 })
    nameZona: string;

    @Column({ name: 'Extension', type: 'decimal', precision: 10, scale: 2 })
    extension: number;

    @CreateDateColumn({ name: 'DateCreate', type: 'datetimeoffset' })
    dateCreate: Date;

    @Column({ name: 'DateUpdate', type: 'datetimeoffset', nullable: true })
    dateUpdate: Date | null;

    @Column({ name: 'DateDelete', type: 'datetimeoffset', nullable: true })
    dateDelete: Date | null;

    @Column({ name: 'EstadoZona', type: 'bit', default: true })
    estadoZona: boolean;

    @OneToMany(() => ItinerarioZona, itinerarioZona => itinerarioZona.zona)
    itinerarios: ItinerarioZona[];

    // Palas tablas de uno a muchos
    @OneToMany(() => Habitat, habitat => habitat.zona)
    habitats: Habitat[];
}