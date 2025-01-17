import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<UserEntity | null>;
    login(user: UserEntity): Promise<{
        user: UserEntity;
        accessToken: string;
    }>;
}
