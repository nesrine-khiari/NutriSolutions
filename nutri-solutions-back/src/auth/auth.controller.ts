import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Public } from './guards/auth.guard';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { CreateClientDto } from 'src/user/client/dtos/create-client.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(
      signInDto.email,
      signInDto.password,
    );
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return this.authService.login(user);
  }
  //   @HttpCode(HttpStatus.OK)
  //   @Post('signup')
  //   async signup(@Body() sginupDto: CreateUserDto) {
  //     if (sginupDto instanceof CreateClientDto)
  //       const user = await this.authService.validateUser(
  //         signInDto.email,
  //         signInDto.password,
  //       );
  //     if (!user) {
  //       throw new Error('Invalid email or password');
  //     }
  //     return this.authService.login(user);
  //   }
}
