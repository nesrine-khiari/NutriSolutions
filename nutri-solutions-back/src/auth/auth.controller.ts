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
import { UserRoleEnum } from 'src/enums/user-enums';
import { EmailService } from 'src/common/email/email.service';
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private nutritionistService: NutritionistService,
    private emailService: EmailService,
  ) {}
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
    // this.emailService.sendWelcomeEmail(signInDto.email, 'Houcem Hbiri');
    return this.authService.login(user);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signupDto: CreateUserDto) {
    let user: UserEntity;
    switch (signupDto.role) {
      case UserRoleEnum.CLIENT:
        user = await this.clientService.create(signupDto as CreateClientDto);
        break;

      case UserRoleEnum.NUTRITIONIST:
        user = await this.nutritionistService.create(
          signupDto as CreateNutritionistDto,
        );
        break;

      default:
        throw new Error('Invalid user type');
    }
    this.emailService.sendWelcomeEmail(signupDto.email, signupDto.name);
    return this.authService.login(user);
  }
}
