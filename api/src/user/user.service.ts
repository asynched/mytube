import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto';

@Injectable()
export class UserService {
  @Inject()
  private prismaService: PrismaService;

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(userId: string) {
    return await this.prismaService.user.findUnique({
      where: {
        userId,
      },
    });
  }

  async createUser(data: CreateUserDto) {
    return await this.prismaService.user.create({
      data,
    });
  }
}
