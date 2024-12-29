import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates the user by email and password.
   * @param email - User's email
   * @param password - User's password
   * @returns The user if valid, null otherwise
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      return null;
    }
    return user;
  }

  /**
   * Generates a JWT token for the authenticated user.
   * @param user - The authenticated user
   * @returns An object containing the access token
   */
  async login(user: UserEntity): Promise<{ accessToken: string }> {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
