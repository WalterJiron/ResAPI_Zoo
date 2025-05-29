import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Rol } from '../../roles/entities/role.entity';

@Entity({ name: 'Users' }) // Nombre exacto de la tabla en SQL Server
export class User {
    @PrimaryGeneratedColumn('uuid', { name: 'CodigoUser' })
    codigoUser: string; // UNIQUEIDENTIFIER en SQL Server

    @Column({ name: 'NameUser', type: 'nvarchar', length: 50 })
    nameUser: string;

    @Column({ name: 'Email', type: 'nvarchar', length: 100, unique: true })
    email: string;

    @Column({ name: 'Clave', type: 'varbinary', length: 300, select: false }) // select: false para no recuperar en queries por defecto
    clave: Buffer; // Para almacenar el hash binario

    @ManyToOne(() => Rol, (rol) => rol.users, { eager: true }) // eager: true para cargar automáticamente el rol
    @JoinColumn({ name: 'Rol' })
    rol: Rol;

    @CreateDateColumn({ name: 'DateCreate', type: 'datetimeoffset' })
    dateCreate: Date;

    @Column({ name: 'DateUpdate', type: 'datetimeoffset', nullable: true })
    dateUpdate: Date | null;

    @Column({ name: 'DateDelete', type: 'datetimeoffset', nullable: true })
    dateDelete: Date | null;

    @Column({ name: 'EstadoUser', type: 'bit', default: true })
    estadoUser: boolean;
}