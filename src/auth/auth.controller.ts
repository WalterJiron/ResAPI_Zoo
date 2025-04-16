import { Controller,  Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } }) 
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @SkipThrottle()
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
      return await this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
