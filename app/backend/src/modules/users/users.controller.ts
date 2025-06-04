import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../../guard/auth.guard';
import { RolesGuard } from '../../guard/roles.guard';
import { ID } from '../../infrastructure/global';
import { SearchUsersDto } from './dto/search-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Users } from './schema/users.schema';
import { UsersService } from './users.service';

@Controller('api/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles('admin', 'manager')
  searchUsers(
    @Query() searchParams: Partial<SearchUsersDto>,
  ): Promise<Users[]> {
    return this.usersService.findAll(searchParams);
  }

  @Put(':id')
  @Roles('admin')
  updateRole(
    @Param('id') userId: ID,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Users> {
    return this.usersService.updateRole(userId, updateRoleDto.role);
  }
}
