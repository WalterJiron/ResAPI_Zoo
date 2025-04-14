// src/itinerarios/entities/guia-itinerario.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Itinerario } from './itinerario.entity';
import { Empleado } from '../../empleados/entities/empleado.entity';

@Entity({ name: 'GuiaItinerario' })
export class GuiaItinerario {
    @PrimaryColumn({ name: 'Empleado', type: 'uniqueidentifier' })
    empleadoId: string;

    @PrimaryColumn({ name: 'Itinerario', type: 'uniqueidentifier' })
    itinerarioId: string;

    @ManyToOne(() => Empleado, empleado => empleado.cargo)
    @JoinColumn({ name: 'Empleado' })
    empleado: Empleado;

    @ManyToOne(() => Itinerario, itinerario => itinerario.guias)
    @JoinColumn({ name: 'Itinerario' })
    itinerario: Itinerario;

    @Column({ name: 'DateCreate', type: 'datetime' })
    dateCreate: Date;

    @Column({ name: 'EstadoGI', type: 'bit', default: true })
    estadoGI: boolean;
}