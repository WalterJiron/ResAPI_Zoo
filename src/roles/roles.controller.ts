import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Auth(Role.Admin)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Auth(Role.Admin)
  @Get()
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Auth(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(id, updateRoleDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rolesService.remove(id);
  }

  @Auth(Role.Admin)
  @Put('/activate/:id')
  async restore(@Param('id') id: string) {
    return await this.rolesService.restore(id);
  }
}
