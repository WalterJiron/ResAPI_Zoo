import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto'
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  // Inyectamos la entidad de User
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  // Para logear al usuario
  async login({ email, password }: LoginDto) {
    // Usamos el proc para verificar el usuario
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

    return this.createToken(email);
  }

  // Crear el token
  async createToken(email: string){
    const user = await this.userRepository.query(`
      SELECT CodigoUser AS codigo, NameUser AS nombre, rol  
      FROM Users 
      WHERE Email = '${email}';
    `);

    // Creamos el payload que es lo que se va a guardar en el token
    const payload = { email: email, rol: user[0]?.rol };

    // Generamos el token
    const token = this.jwtService.sign(payload);

    return { token: token };
  }
}
