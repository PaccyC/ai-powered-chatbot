import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("login")
    async login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto);
    }

    @Post("register")
    async register(@Body() signupDto:SignupDto){
        return this.authService.register(signupDto);
    }
}
