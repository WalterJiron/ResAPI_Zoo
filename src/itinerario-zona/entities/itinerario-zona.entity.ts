import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Itinerario } from '../../itinerarios/entities/itinerario.entity';
import { Zona } from '../../zonas/entities/zona.entity';

@Entity({ name: 'ItinerarioZona' })
export class ItinerarioZona {
    @PrimaryColumn({ name: 'Itinerario', type: 'uniqueidentifier' })
    itinerarioId: string;

    @PrimaryColumn({ name: 'Zona', type: 'uniqueidentifier' })
    zonaId: string;

    @ManyToOne(() => Itinerario, itinerario => itinerario.zonas)
    @JoinColumn({ name: 'Itinerario' })
    itinerario: Itinerario;

    @ManyToOne(() => Zona, zona => zona.itinerarios)
    @JoinColumn({ name: 'Zona' })
    zona: Zona;

    @Column({ name: 'DateCreate', type: 'datetime' })
    dateCreate: Date;

    @Column({ name: 'EstadoItZo', type: 'bit', default: true })
    estadoItZo: boolean;
}