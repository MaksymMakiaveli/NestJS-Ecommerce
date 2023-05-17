import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestGlobalResponse,
  ApiOkGlobalResponse,
  PublicRoute,
} from '../common/decorators';
import { AuthResponseDto, SignUpDto } from './dto';
import { SignInDto } from './dto/signIn.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @PublicRoute()
  @ApiOkGlobalResponse(AuthResponseDto)
  @ApiBadRequestGlobalResponse()
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  @PublicRoute()
  @ApiOkGlobalResponse(AuthResponseDto)
  @ApiBadRequestGlobalResponse()
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }
}
