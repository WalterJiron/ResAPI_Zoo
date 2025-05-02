import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidationService } from '../common/validation.services';

@Injectable()
export class UsersService {
  // Inyectamos la entidad de User
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
    // Usamos el proc para crear el usuario
    const result = await this.userRepository.query(
      `DECLARE @Mensaje AS VARCHAR(100);

        EXEC ProcInsertUser
          @NameUser = @0, 
          @Email = @1, 
          @Clave = @2, 
          @Rol = @3,
          @Mensaje = @Mensaje OUTPUT;
        
          SELECT @Mensaje AS message;
      `, [
      createUserDto.nameUser,
      createUserDto.email,
      createUserDto.password,
      createUserDto.rol,
    ]
    );

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async findAll() {
    const users = await this.userRepository.find();

    if (!users.length) {
      throw new NotFoundException('No existen usuarios');
    }

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { codigoUser: id },
      relations: ['rol']
    });

    if (!user) {
      throw new BadRequestException(`El usuario con id ${id} no existe o esta inactivo`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<{ message: string }> {

    const result = await this.userRepository.query(`
      DECLARE @Mensaje VARCHAR(100);

      EXEC ProcUpdateUser
        @CodigoUser = @0,
        @NameUser = @1,
        @Email = @2,
        @Clave = @3,
        @Rol = @4,
        @Mensaje = @Mensaje OUTPUT;

      SELECT @Mensaje AS message;
    `, [
      id,
      updateUserDto.nameUser,
      updateUserDto.email,
      updateUserDto.password,
      updateUserDto.rol,
    ]
    );

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.userRepository.query(`
          DECLARE @Mensaje VARCHAR(100);

          EXEC ProcDeleteUser
            @CodigoUser = @0,
            @Mensaje = @Mensaje OUTPUT;

          SELECT @Mensaje AS message;
      `, [id]
    );

    return ValidationService.verifiedResult(result, 'correctamente');
  }

  async restore(id: string): Promise<{ message: string }> {
    const result = await this.userRepository.query(`
          DECLARE @Mensaje VARCHAR(100);

          EXEC ProcRecoverUser
            @CodigoUser = @0,
            @Mensaje = @Mensaje OUTPUT;

          SELECT @Mensaje AS message;
      `, [id]
    );

    return ValidationService.verifiedResult(result, 'correctamente');
  }

}
