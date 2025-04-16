import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/role.entity';
import { Repository } from 'typeorm';
import { ValidationService } from '../common/validation.services';

@Injectable()
export class RolesService {
  // Inyectamos la entidad
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) { }

  // Creamos el rol
  async create(createRoleDto: CreateRoleDto): Promise<{ message: string}> {
    // Usamos el proc para crear el rol
    const result = await this.rolRepository.query(`
            DECLARE @Mensaje VARCHAR(100)
            EXEC ProcInsertRol
              @NombreRol = @0,
              @Descripcion = @1,
              @Mensaje = @Mensaje OUTPUT
            SELECT @Mensaje AS message;
      `,[
        createRoleDto.nombreRol,
        createRoleDto.descripRol
      ]);

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  // Listamos todos los roles
  async findAll() {
    const roles = await this.rolRepository.find();

    // Miramos si hay roles
    if(!roles.length) {
      throw new NotFoundException('No existen roles');
    }

    return roles;
  }

  // Listamos un rol por id
  async findOne(id: string) {
    const rol = await this.rolRepository.findOne({
      where: { codigoRol: id, estadoRol: true}
    });

    // Miramos si existe el rol
    if (!rol) {
      throw new NotFoundException(`El rol con id ${id} no existe o esta inactivo`);
    }

    return rol;
  }

  // Hacemos un update al rol
  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<{ message: string}> {
      // Usamos el proc para actualizar el rol
      const result = await this.rolRepository.query(`
            DECLARE @Mensaje VARCHAR(100)
            EXEC ProcUpdateRol
              @CodigoRol = @0,
              @NombreRol = @1,
              @Descripcion = @2,
              @Mensaje = @Mensaje OUTPUT
            SELECT @Mensaje AS message;
      `, [
        id,
        updateRoleDto.nombreRol,
        updateRoleDto.descripRol
      ]);

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  // Hacemos la eliminacion logica del rol
  async remove(id: string): Promise<{ message: string }> {
    // Usamos el proc para eliminar el rol
    const result = await this.rolRepository.query(`
          DECLARE @Mensaje VARCHAR(100)
          EXEC ProcDeleteRol
            @CodigoRol = @0,
            @Mensaje = @Mensaje OUTPUT
          SELECT @Mensaje AS message;
      `, [ id ]);

    
    return ValidationService.verifiedResult(result, 'correctamente');
  }

  // Hacemos la restauracion del rol
  async restore(id: string): Promise<{ message: string }> {
    // Usamos el proc para eliminar el rol
    const result = await this.rolRepository.query(`
          DECLARE @Mensaje VARCHAR(100)
          EXEC ProcRecoverRol
            @CodigoRol = @0,
            @Mensaje = @Mensaje OUTPUT
          SELECT @Mensaje AS message;
      `, [id]);


    return ValidationService.verifiedResult(result, 'correctamente');
  }
}
