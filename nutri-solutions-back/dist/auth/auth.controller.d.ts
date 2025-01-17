import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { ClientService } from 'src/user/client/client.service';
import { NutritionistService } from 'src/user/nutritionist/nutritionist.service';
import { UserEntity } from 'src/user/user.entity';
export declare class AuthController {
    private authService;
    private clientService;
    private nutritionistService;
    constructor(authService: AuthService, clientService: ClientService, nutritionistService: NutritionistService);
    login(signInDto: SignInDto): Promise<{
        user: UserEntity;
        accessToken: string;
    }>;
    signup(signupDto: CreateUserDto): Promise<{
        user: UserEntity;
        accessToken: string;
    }>;
}
