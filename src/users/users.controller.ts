import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })     
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Put('/activate/:id')  
  async activate(@Param('id') id: string) {
    return this.usersService.restore(id);
  }
}
