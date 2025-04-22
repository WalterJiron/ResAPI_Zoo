import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Empleado } from '../../empleados/entities/empleado.entity';
import { Especie } from '../../especie/entities/especie.entity';

@Entity({ name: 'CuidadorEspecie' })
export class CuidadorEspecie {
    @PrimaryColumn({ name: 'IdEmpleado', type: 'uniqueidentifier', nullable: false })
    idEmpleado: string;

    @ManyToOne(() => Empleado, (empleado) => empleado.codigEmpleado, { eager: true }) 
    @JoinColumn({ name: 'IdEmpleado' })
    empleado: Empleado;

    @PrimaryColumn({ name: 'IdEspecie', type: 'uniqueidentifier', nullable: false })
    idEspecie: string;

    @ManyToOne(() => Especie, (especie) => especie.codigoEspecie)
    @JoinColumn({ name: 'IdEspecie' })
    especie: Especie;

    @Column({ name:'FechaAsignacion', type: 'date', nullable: false })  
    fechaAsignacion: Date;

    @CreateDateColumn({
        name: 'DateCreate',
        type: 'datetime',
        default: () => 'GETDATE()',
    })
    dateCreate: Date;

    @Column({ name:'EstadoCE', type: 'bit', default: true })
    estadoCE: boolean;

}
