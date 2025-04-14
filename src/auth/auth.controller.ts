import { Controller,  Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';


@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Throttle({ login: { limit: 5, ttl: 60000 } }) 
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
