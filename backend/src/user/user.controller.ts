import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { appUser } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @UseGuards(JwtGuard)
    @Get("me")
    getProfile(@GetUser() user: appUser){

        return user;
    }

    @UseGuards(JwtGuard)
    @Get("all")
    getAllUsers(){
      return this.userService.getAllUsers();
    }
}
