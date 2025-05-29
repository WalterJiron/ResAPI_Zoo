import { Empleado } from 'src/empleados/entities/empleado.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DetalleEmpleado')
export class DetalleEmpleado {
    @PrimaryColumn({
        name: 'CodigoDetEmpleado',
        type: 'uniqueidentifier',
        default: () => 'NEWID()'
    })
    codigoDetEmpleado: string;

    @ManyToOne(() => Empleado, (empleado) => empleado.detalleEmpleado)
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

    @CreateDateColumn({
        name: 'DateCreate',
        type: 'datetimeoffset',
        default: () => "SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time',"
    })
    dateCreate: Date;

    @Column({
        name: 'DateUpdate',
        type: 'datetimeoffset',
    })
    dateUpdate: Date | null;

    @Column({
        name: 'DateDelete',
        type: 'datetimeoffset',
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
