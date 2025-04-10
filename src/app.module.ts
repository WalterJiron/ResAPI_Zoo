import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/entities/user.entity';
import { Rol } from './roles/entities/role.entity';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    // Para el manejo de peticiones
    ThrottlerModule.forRoot({
      throttlers: [
        // Para la proteccion de las rutas
        {
          name: 'api',
          ttl: 60000,  // 1 minuto (en milisegundos)
          limit: 100,  // 100 peticiones por minuto
          blockDuration: 60000,
        },
        // Configuración especifica para login
        {
          name: 'login',
          ttl: 60000,     // 1 minuto
          limit: 5,       // Solo 5 intentos cada 10 minutos
          blockDuration: 600000,
        }
      ],
      errorMessage: 'Demasiadas solicitudes. Por favor intente nuevamente más tarde.',
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: false,
      autoLoadEntities: true,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
      entities: [User, Rol]
    }),

    UsersModule,

    RolesModule,

    AuthModule
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Aplica el guard globalmente
    },
  ],
})
export class AppModule { }
