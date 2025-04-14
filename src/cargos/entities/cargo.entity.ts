// src/cargos/entities/cargo.entity.ts
import { Entity, Column, PrimaryColumn, CreateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Empleado } from '../../empleados/entities/empleado.entity';

@Entity({ name: 'Cargo' })
export class Cargo {
    @PrimaryColumn({
        name: 'CodifoCargo',
        type: 'uniqueidentifier',
        default: () => 'NEWID()'
    })
    codifoCargo: string;

    @Column({ name: 'NombreCargo', type: 'nvarchar', length: 50 })
    nombreCargo: string;

    @Column({ name: 'DescripCargo', type: 'nvarchar', length: 'max' })
    descripCargo: string;

    @CreateDateColumn({ name: 'DateCreate', type: 'datetime' })
    dateCreate: Date;

    @DeleteDateColumn({ name: 'DateDelete', type: 'datetime', nullable: true })
    dateDelete: Date | null;

    @Column({ name: 'EstadoCargo', type: 'bit', default: true })
    estadoCargo: boolean;

    @OneToMany(() => Empleado, empleado => empleado.cargo)
    empleados: Empleado[];
}