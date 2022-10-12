import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';

@Controller('/api/profile')
export class UserController {
  @Inject()
  private userService: UserService;

  @UseGuards(JwtAuthGuard)
  @Get()
  getOwnerProfile(@Req() request: Request) {
    const { password, email, ...user } = request.user;

    return user;
  }

  @Get('/:id')
  async getUserProfile(@Param('id', ParseUUIDPipe) id: string) {
    const profile = await this.userService.findUserById(id);

    if (!profile) {
      throw new NotFoundException('User not found');
    }

    const { password, email, ...user } = profile;

    return user;
  }
}
