import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/auth.guard';
import { RegisterUserDto } from 'src/auth/dto';

@Controller('/api/auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() request) {
    return this.authService.login(request.user);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() data: RegisterUserDto) {
    try {
      await this.authService.registerUser(data);

      return {
        message: 'User created successfully',
      };
    } catch (err) {
      throw new BadRequestException('Email already in use');
    }
  }
}
