import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { Throttle } from '@nestjs/throttler';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(id, updateRoleDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rolesService.remove(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @UseGuards(AuthGuard)
  @Put('/Activate/:id')
  async restore(@Param('id') id: string) {
    return await this.rolesService.restore(id);
  }
}
