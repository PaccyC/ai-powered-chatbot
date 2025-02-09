import { Module } from '@nestjs/common';
import { AuthService} from './auth.service';
import { AuthController} from './auth.controller';
import { JwtModule} from '@nestjs/jwt';
import { PassportModule} from '@nestjs/passport';
import { PrismaModule} from 'src/prisma/prisma.module';
import { JwtStrategy} from './strategy/jwt.strategy';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:'2d'}
  }),
  PrismaModule
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
