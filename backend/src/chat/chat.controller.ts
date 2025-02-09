import { Controller, Get, Post, Body, Param, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('session')
  async createChatSession(@Req() req) {
    console.log("Request user:", req.user); 
    if (!req.user || !req.user.id) {
      throw new ForbiddenException("User not authenticated properly");
    }
    return await this.chatService.createSession(req.user.id);
  }

  @Get('sessions')
  async getUserChatSessions(@Req() req) {
    return await this.chatService.getUserSessions(req.user.id);
  }
}
