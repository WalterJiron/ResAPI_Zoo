// src/modules/roles/entities/rol.entity.ts
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn,  
    OneToMany 
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'Rol' }) // Nombre exacto de la tabla en SQL Server
export class Rol {
    @PrimaryGeneratedColumn('uuid', { name: 'CodigoRol' })
    codigoRol: string; // UNIQUEIDENTIFIER en SQL Server

    @Column({ name: 'NombreRol', type: 'nvarchar', length: 50 })
    nombreRol: string;

    @Column({ name: 'DescripRol', type: 'nvarchar', length: 'max' })
    descripRol: string;

    @CreateDateColumn({ name: 'DateCreate', type: 'datetime' })
    dateCreate: Date;

    @Column({ name: 'DateDelete', type: 'datetime', nullable: true })
    dateDelete: Date | null;

    @Column({ name: 'EstadoRol', type: 'bit', default: true })
    estadoRol: boolean;

    // Relación con Usuarios
    @OneToMany(() => User, (user) => user.rol)
    users: User[];
}