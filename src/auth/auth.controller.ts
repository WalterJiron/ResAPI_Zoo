import { Controller,  Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async wtf(){
    return "Wata con nest.";
  }
  
  @Throttle({ default: { limit: 5, ttl: 60000 } }) 
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
