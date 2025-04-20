import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { jwtConstants } from './constants/jwt.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

    return this.createTokens(email);
  }

  async createTokens(email: string) {
    const user = await this.userRepository.query(`
      SELECT CodigoUser AS codigo, NameUser AS nombre, rol  
      FROM Users 
      WHERE Email = '${email}';
    `);

    const payload = { email: email, rol: user[0]?.rol, };

    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.accessSecret,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN, // Acceso valido por 15 minutos
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN, // Refresco valido por 2 dias
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });

      const newAccessToken = this.jwtService.sign(
        { email: payload.email, rol: payload.rol },
        {
          secret: jwtConstants.accessSecret,
          expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        },
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh token invalido o expirado');
    }
  }
}
