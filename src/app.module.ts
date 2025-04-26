import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/entities/user.entity';
import { Rol } from './roles/entities/role.entity';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ContinentesModule } from './continentes/continentes.module';
import { EspecieModule } from './especie/especie.module';
import { ZonasModule } from './zonas/zonas.module';
import { CargosModule } from './cargos/cargos.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { ThrottlerBehindProxyGuard } from './guard/throttler-behind-proxy.guard';
import { HabitatsModule } from './habitats/habitats.module';
import { ItinerariosModule } from './itinerarios/itinerarios.module';
import { EspecieHabitatModule } from './especie-habitat/especie-habitat.module';
import { HabitatContinenteModule } from './habitat-continente/habitat-continente.module';
import { GuiaItinerarioModule } from './guia-itinerario/guia-itinerario.module';
import { ItinerarioZonaModule } from './itinerario-zona/itinerario-zona.module';
import { CuidadorEspecieModule } from './cuidador-especie/cuidador-especie.module';
import { DetalleEmpleadoModule } from './detalle-empleado/detalle-empleado.module';

@Module({
  imports: [

    // Para la seguridad de las peticiones
    ThrottlerModule.forRoot({
      throttlers: [

        // Configuración general para otras rutas (100 peticiones/minuto)
        {
          name: 'api',
          limit: 100,
          ttl: 60000,
          blockDuration: 60000, // Bloqueo por 1 minuto
        },
        
        // Configuración específica para login (5 intentos cada 10 minutos)
        {
          ttl: 60000,    // 1 minuto (en ms)
          limit: 5,      // 5 intentos por minuto
          blockDuration: 600000, // Bloqueo por 10 minutos si se excede
        },

      ],
      errorMessage: 'Demasiadas solicitudes. Por favor intente nuevamente mas tarde.',

    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // La conexion a la base dedatos 
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

    AuthModule,

    UsersModule,

    RolesModule,

    ContinentesModule,

    EspecieModule,

    ZonasModule,

    CargosModule,

    EmpleadosModule,

    HabitatsModule,

    ItinerariosModule,

    EspecieHabitatModule,

    HabitatContinenteModule,

    GuiaItinerarioModule,

    ItinerarioZonaModule,

    CuidadorEspecieModule,

    DetalleEmpleadoModule
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard
    },
  ],
})
export class AppModule { }
