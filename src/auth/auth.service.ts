import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto'
import { UsersService } from 'src/users/users.service';
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async login({ email, password }: LoginDto) {
    const result = await this.userRepository.query(`
      DECLARE @Mensaje VARCHAR(100);
      EXEC sp_VerificarUsuario 
        @Email = '${email}', 
        @Clave = '${password}', 
        @Mensaje = @Mensaje OUTPUT;

      SELECT @Mensaje AS mensaje;
    `);

    const mensaje = result[0]?.mensaje;

    if (mensaje !== 'OK') {
      throw new UnauthorizedException(mensaje);
    }

    const user = await this.userRepository.query(`
      SELECT CodigoUser AS codigo, NameUser AS nombre, rol  
      FROM Users 
      WHERE Email = '${email}';
    `);

    return {
      codigo: user[0]?.codigo,
      nombre: user[0]?.nombre,
      rol: user[0]?.rol,
    };
  }
}
