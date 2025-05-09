import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Auth(Role.Admin)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<{ message: string }> {
    return this.usersService.update(id, updateUserDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.remove(id);
  }


  @Put('/activate/:id')
  async activate(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.restore(id);
  }

}
