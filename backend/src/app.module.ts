import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guard/jwt.guard';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { ChatModule } from './chat/chat.module';
import { AiModule } from './ai/ai.module';
@Module({
  imports: [
    AuthModule,
     UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:".env",
      load: [() => ({
        JWT_SECRET: process.env.JWT_SECRET,
      })]
  
    }),
    PrismaModule,
    ChatModule,
    AiModule
    ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    },
    JwtStrategy
  ],
})
export class AppModule {}
