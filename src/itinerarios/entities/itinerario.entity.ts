// src/itinerarios/entities/itinerario.entity.ts
import { Entity, Column, PrimaryColumn, CreateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { ItinerarioZona } from '../../itinerario-zona/entities/itinerario-zona.entity';
import { GuiaItinerario } from '../../guia-itinerario/entities/guia-itinerario.entity';

@Entity({ name: 'Itinerario' })
export class Itinerario {
    @PrimaryColumn({
        name: 'CodigoIti',
        type: 'uniqueidentifier',
        default: () => 'NEWID()'
    })
    codigoIti: string;

    @Column({ name: 'Duracion', type: 'time' })
    duracion: string;

    @Column({ name: 'Longitud', type: 'decimal', precision: 10, scale: 2 })
    longitud: number;

    @Column({ name: 'MaxVisitantes', type: 'int' })
    maxVisitantes: number;

    @Column({ name: 'NumEspecies', type: 'int' })
    numEspecies: number;

    @Column({ name: 'Fecha', type: 'date' })
    fecha: Date;

    @Column({ name: 'Hora', type: 'time' })
    horaInicio: string;

    @CreateDateColumn({ name: 'DateCreate', type: 'datetimeoffset' })
    dateCreate: Date;

    @Column({ name: 'DateUpdate', type: 'datetimeoffset', nullable: true })
    dateUpdate: Date | null;

    @Column({ name: 'DateDelete', type: 'datetimeoffset', nullable: true })
    dateDelete: Date | null;

    @Column({ name: 'Estado', type: 'bit', default: true })
    estado: boolean;

    @OneToMany(() => ItinerarioZona, itinerarioZona => itinerarioZona.itinerario)
    zonas: ItinerarioZona[];

    @OneToMany(() => GuiaItinerario, guiaItinerario => guiaItinerario.itinerario)
    guias: GuiaItinerario[];
}