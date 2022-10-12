import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptographyService } from 'src/cryptography/cryptography.service';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from 'src/auth/dto';
import { UserModel } from 'src/user/entities';

export class AuthService {
  @Inject()
  private userService: UserService;

  @Inject()
  private cryptographyService: CryptographyService;

  @Inject()
  private jwtService: JwtService;

  async login(user: UserModel) {
    const payload = {
      email: user.email,
      sub: user.userId,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async registerUser(data: RegisterUserDto) {
    const password = await this.cryptographyService.hash(data.password);

    return await this.userService.createUser({
      ...data,
      password,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.cryptographyService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;

    return result;
  }
}
