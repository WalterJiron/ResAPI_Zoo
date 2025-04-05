import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<{ message: string}> {
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

    if (result[0].message.includes('correctamente')){
      return {message: result[0].message};
    }else{
      throw new NotFoundException(result[0].message);
    }

  }

  async findAll() {
    return await this.rolRepository.find();
  }

  async findOne(id: string) {
    return await this.rolRepository.findOne({
      where: {
        codigoRol: id,
        estadoRol: true
      }
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<{ message: string}> {
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

      if (result[0].message.includes('correctamente')) {
        return { message: result[0].message };
      } else {
        throw new NotFoundException(result[0].message);
      }
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.rolRepository.query(`
          DECLARE @Mensaje VARCHAR(100)
          EXEC ProcDeleteRol
            @CodigoRol = @0,
            @Mensaje = @Mensaje OUTPUT
          SELECT @Mensaje AS message;
      `, [ id ]);

    if (result[0].message.includes('correctamente')) {
      return { message: result[0].message };
    } else {
      throw new NotFoundException(result[0].message);
    }
  }
}
