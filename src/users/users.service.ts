import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  
  async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
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
          createUserDto.password, // La clave se ecripta en el proc
          createUserDto.rol,
        ],
    );

    if (result[0].message.includes('correctamente')) {
      return { message: result[0].message };
    } else {
      throw new NotFoundException(result[0].message);
    }
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: {
        codigoUser: id,
        estadoUser: true
      },
      relations: ['rol']
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<{ message: string }> {
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

    if (result[0].message.includes('correctamente')) {
      return { message: result[0].message };
    } else {
      throw new NotFoundException(result[0].message);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
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
      throw new NotFoundException(result[0].message);
    }
  }

}
