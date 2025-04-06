// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module'; // Usa rutas relativas
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    UsersService,
    TypeOrmModule.forFeature([User]), 
  ]
})
export class UsersModule { }