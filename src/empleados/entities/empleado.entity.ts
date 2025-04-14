import { 
    Entity, Column, PrimaryColumn, 
    CreateDateColumn, DeleteDateColumn, 
    ManyToOne, JoinColumn 
} from 'typeorm';
import { Cargo } from '../../cargos/entities/cargo.entity';

@Entity({ name: 'Empleado' })
export class Empleado {
    @PrimaryColumn({
        name: 'CodigEmpleado',
        type: 'uniqueidentifier',
        default: () => 'NEWID()'
    })
    codigEmpleado: string;

    @Column({ name: 'PNE', type: 'nvarchar', length: 25 })
    pne: string;

    @Column({ name: 'SNE', type: 'nvarchar', length: 25, nullable: true })
    sne: string;

    @Column({ name: 'PAE', type: 'nvarchar', length: 25 })
    pae: string;

    @Column({ name: 'SAE', type: 'nvarchar', length: 25, nullable: true })
    sae: string;

    @Column({ name: 'DireccionE', type: 'nvarchar', length: 200 })
    direccionE: string;

    @Column({ name: 'TelefonoE', type: 'varchar', length: 8 })
    telefonoE: string;

    @Column({ name: 'EmailE', type: 'nvarchar', length: 100 })
    emailE: string;

    @Column({ name: 'FechaIngreso', type: 'date' })
    fechaIngreso: Date;

    @ManyToOne(() => Cargo, (Cargo) => Cargo.empleados, {eager: true})
    @JoinColumn({ name: 'IdCargo' })
    cargo: Cargo;

    @CreateDateColumn({ name: 'DateCreate', type: 'datetime' })
    dateCreate: Date;

    @DeleteDateColumn({ name: 'DateDelete', type: 'datetime', nullable: true })
    dateDelete: Date | null;

    @Column({ name: 'EstadoEmpleado', type: 'bit', default: true })
    estadoEmpleado: boolean;
}