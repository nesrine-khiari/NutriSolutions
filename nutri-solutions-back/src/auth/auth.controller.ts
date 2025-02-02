import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Public } from './guards/auth.guard';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { CreateClientDto } from 'src/user/client/dtos/create-client.dto';
import { CreateNutritionistDto } from 'src/user/nutritionist/dtos/create-nutritionist.dto';
import { ClientService } from 'src/user/client/client.service';
import { NutritionistService } from 'src/user/nutritionist/nutritionist.service';
import { UserEntity } from 'src/user/user.entity';
import { NutritionistStatusEnum, UserRoleEnum } from 'src/enums/user-enums';
import { EmailService } from 'src/common/email/email.service';
import { UpdatePasswordDto } from './dtos/update-password.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private nutritionistService: NutritionistService,
    private emailService: EmailService,
  ) {}

  /**
   * Endpoint pour se connecter
   * @param signInDto Les informations de connexion
   * @returns Un token JWT si les informations sont valides
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(
      signInDto.email,
      signInDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // Check nutritionist approval status
    if (user.role === UserRoleEnum.NUTRITIONIST) {
      if ((user as any).status === NutritionistStatusEnum.WAITING) {
        throw new UnauthorizedException(
          'Your account has not been approved yet.',
        );
      } else if ((user as any).status === NutritionistStatusEnum.REJECTED) {
        throw new UnauthorizedException('This account was rejected.');
      }
    }
    return this.authService.login(user);
  }

  /**
   * Endpoint pour s'inscrire
   * @param signupDto Les informations d'inscription
   * @returns Un token JWT si l'inscription est réussie
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signupDto: CreateUserDto) {
    let user: UserEntity;
    switch (signupDto.role) {
      case UserRoleEnum.CLIENT:
        user = await this.clientService.create(signupDto as CreateClientDto);
        this.emailService.sendWelcomeEmail(signupDto.email, signupDto.name);
        return this.authService.login(user);

      case UserRoleEnum.NUTRITIONIST:
        user = await this.nutritionistService.create(
          signupDto as CreateNutritionistDto,
        );
        this.emailService.sendNewNutritionistAlert(signupDto.name);
        break;

      default:
        throw new Error('Invalid user type');
    }
  }

  /**
   * Endpoint pour demander une réinitialisation de mot de passe
   * @param email L'email de l'utilisateur
   * @returns Une réponse de succès si l'email est envoyé
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  /**
   * Endpoint pour réinitialiser le mot de passe
   * @param updatePassword Les informations de réinitialisation de mot de passe
   * @returns Une réponse de succès si le mot de passe est réinitialisé
   */
  @Post('reset-password')
  async resetPassword(@Body() updatePassword: UpdatePasswordDto) {
    return this.authService.resetPassword(
      updatePassword.resetToken,
      updatePassword.oldPassword,
      updatePassword.newPassword,
    );
  }
}
