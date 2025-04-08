import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//import * as bcryptjs from 'bcryptjs';   -------- POSIBLE IMPLEMENTACION

@Injectable()
export class UsersService {
  // Inyectamos la entidad de User
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  
  // Creamos un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
    // Usamos el proc para crear el usuario
    const result = await this.userRepository.query(
        `DECLARE @Mensaje VARCHAR(100)
        EXEC ProcInsertUser 
          @NameUser = @0, 
          @Email = @1, 
          @Clave = @2, 
          @Rol = @3,
          @Mensaje = @Mensaje OUTPUT
        SELECT @Mensaje AS message`,
        [
          createUserDto.nameUser,
          createUserDto.email,
          createUserDto.password,  // La clave se ecripta en el proc
          createUserDto.rol,
        ],
    );

    // Miramos si el mensaje contiene la palabra correctamente si es asi devolvemos el mensaje
    if (result[0].message.includes('correctamente')) {
      return { message: result[0].message };
    } else {
      throw new BadRequestException(result[0].message);
    }
  }

  // Listamos todos los usuarios
  async findAll() {
    // Buscamos todos los usuarios
    const users = await this.userRepository.find();

    // Miramos si hay usuarios
    if (!users.length) {
      throw new NotFoundException('No existen usuarios');
    }

    return users;
  }

  // Listamos un usuario por id
  async findOne(id: string) {
    // Buscamos el usuario por id
    const rol = await this.userRepository.findOne({
      where: { codigoUser: id, estadoUser: true },
      relations: ['rol']
    });

    // Miramos si existe el usuario
    if (!rol) {
      throw new NotFoundException(`El usuario con id ${id} no existe o esta inactivo`);
    }

    return rol;
  }

  // Hacemos un update al usuario
  async update(id: string, updateUserDto: UpdateUserDto): Promise<{ message: string }> {
    // Usamos el proc para actualizar el usuario
    const result = await this.userRepository.query(`
      DECLARE @Mensaje VARCHAR(100)
      EXEC ProcUpdateUser
        @CodigoUser = @0,
        @NameUser = @1,
        @Email = @2,
        @Clave = @3,
        @Rol = @4,
        @Mensaje = @Mensaje OUTPUT
      SELECT @Mensaje AS message
    `, [
      id,
      updateUserDto.nameUser,
      updateUserDto.email,
      updateUserDto.password,
      updateUserDto.rol,
    ]);

    // Miramos si el mensaje contiene la palabra correctamente si es asi devolvemos el mensaje
    if (result[0].message.includes('correctamente')) {
      return { message: result[0].message };
    } else {
      throw new BadRequestException(result[0].message);
    }
  }

  // Hacemos un delete al usuario
  async remove(id: string): Promise<{ message: string }> {
    // Usamos el proc para eliminar el usuario
    const result = await this.userRepository.query(`
          DECLARE @Mensaje VARCHAR(100)
          EXEC ProcDeleteUser
            @CodigoUser = @0,
            @Mensaje = @Mensaje OUTPUT
          SELECT @Mensaje AS message;
      `, [ id ]);

    if (result[0].message.includes('correctamente')) {
      return { message: result[0].message };
    } else {
      throw new BadRequestException(result[0].message);
    }
  }

}
