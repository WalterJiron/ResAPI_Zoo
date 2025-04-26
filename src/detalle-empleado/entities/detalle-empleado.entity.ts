import { Empleado } from 'src/empleados/entities/empleado.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DetalleEmpleado')
export class DetalleEmpleado {
    @PrimaryColumn({
        name: 'CodigoDetEmpleado',
        type: 'uniqueidentifier',
        default: () => 'NEWID()'
    })
    codigoDetEmpleado: string;

    @ManyToOne(() => Empleado, (empleado)=>empleado.detalleEmpleado)
    @JoinColumn({ name: 'CodigEmpleado' })
    codigEmpleado: Empleado;

    @Column({ 
        name: 'Cedula', 
        type: 'nvarchar', 
        length: 16, 
        unique: true, 
        nullable: false 
    })
    cedula: string;

    @Column({ 
        name: 'FechaNacimiento', 
        type: 'date', 
        nullable: false 
    })
    fechaNacimiento: Date;

    @Column({ 
        name: 'Genero', 
        type: 'char', 
        length: 1, 
        nullable: false 
    })
    genero: string;

    @Column({ 
        name: 'EstadoCivil', 
        type: 'nvarchar', 
        length: 20, 
        nullable: true 
    })
    estadoCivil: string;

    @Column({ 
        name: 'INSS', 
        type: 'nvarchar', 
        length: 9, 
        unique: true, 
        nullable: false 
    })
    inss: string;

    @Column({ 
        name: 'TelefonoEmergencia', 
        type: 'varchar', 
        length: 8, 
        unique: true, 
        nullable: false 
    })
    telefonoEmergencia: string;

    @Column({ 
        name: 'DateCreate', 
        type: 'datetime', 
        default: () => 'GETDATE()' 
    })
    dateCreate: Date;

    @Column({ 
        name: 'DateDelete', 
        type: 'datetime', 
        nullable: true 
    })
    dateDelete: Date;

    @Column({ 
        name: 'EstadoDetalleEmpleado', 
        type: 'bit', 
        default: true 
    })
    estadoDetalleEmpleado: boolean;

}
