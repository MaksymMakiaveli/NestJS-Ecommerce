import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtRequestType } from '../common/constants';
import { ApiOkGlobalResponse, CurrentUserId } from '../common/decorators';
import { UserEntity } from './entities';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth(JwtRequestType.auth)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @ApiOkGlobalResponse(UserEntity)
  @ApiBearerAuth(JwtRequestType.auth)
  getMe(@CurrentUserId() id: number) {
    return this.usersService.findById(id);
  }

  @Get()
  @ApiOkGlobalResponse(UserEntity, { type: 'array' })
  @ApiBearerAuth(JwtRequestType.auth)
  findAll() {
    return this.usersService.findAll();
  }
}
