import { EspecieHabitat } from 'src/especie-habitat/entities/especie-habitat.entity';
import { Entity, Column, PrimaryColumn, CreateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'Especie' })
export class Especie {
    @PrimaryColumn({ 
        name: 'CodigoEspecie', type: 'uniqueidentifier', default: () => 'NEWID()', 
        generated: 'uuid'
    })
    codigoEspecie: string;

    @Column({ name: 'Nombre', type: 'nvarchar', length: 100 })
    nombre: string;

    @Column({ name: 'NameCientifico', type: 'nvarchar', length: 100 })
    nameCientifico: string;

    @Column({ name: 'Descripcion', type: 'nvarchar', length: 'max' })
    descripcion: string;

    @CreateDateColumn({
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
    dateDelete: Date | null;

    @Column({
        name: 'Estado',
        type: 'bit',
        default: true
    })
    estado: boolean;

    // Para las tablas de muchos a muchos
    @OneToMany(() => EspecieHabitat, especieHabitat => especieHabitat.especie)
    habitats: EspecieHabitat[];
}