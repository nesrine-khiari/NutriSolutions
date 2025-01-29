import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/common/email/email.service';
import { Client } from 'src/user/client/client.entity';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(AuthService.name);
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
    const user = await this.userService.validateUser(email, password);
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
  async login(
    user: UserEntity,
  ): Promise<{ user: UserEntity; accessToken: string }> {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return { user: user, accessToken: this.jwtService.sign(payload) };
  }
  /**
   * Generates a reset token and sends it via email.
   * @param email - User's email
   * @returns A success message
   */
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User with this email does not exist.');
    }

    const resetToken = this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });

    console.log(`Reset token: ${resetToken}`);

    await this.emailService.sendPasswordResetEmail(
      user.email,
      resetToken,
      user.name,
    ); // Send email

    return { message: 'Password reset link sent to your email.' };
  }

  /**
   * Resets the password using a valid reset token.
   * @param resetToken - The token sent to the user's email
   * @param newPassword - The new password
   * @returns A success message
   */
  async resetPassword(
    resetToken: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(resetToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      const user = await this.userService.findOneByEmail(payload.email);
      if (!user) {
        throw new BadRequestException('Invalid reset token.');
      }
      this.logger.debug(user.password);
      this.logger.debug(oldPassword);

      // Check if old password matches
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      this.logger.debug(isMatch);

      if (!isMatch) {
        throw new UnauthorizedException('Old password is incorrect');
      }

      await this.userService.updatePassword(user.id, newPassword);

      return { message: 'Password reset successfully.' };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Invalid or expired reset token.');
    }
  }
}
