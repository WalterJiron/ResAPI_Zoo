import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post()
  @Auth(Role.Admin)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(Role.Admin)
  async findAll() {
    return this.usersService.findAll();
  }

  
  @Get(':id')
  @Auth(Role.Admin)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  
  @Patch(':id')
  @Auth(Role.Admin)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  
  @Delete(':id')
  @Auth(Role.Admin)
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  
  @Put('/activate/:id')  
  @Auth(Role.Admin)
  async activate(@Param('id') id: string) {
    return this.usersService.restore(id);
  }
}
