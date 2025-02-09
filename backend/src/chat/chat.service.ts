import { Injectable } from '@nestjs/common';
import { ChatSession, Message } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService){}

    async createSession(userId: number): Promise<ChatSession>{
        return await this.prisma.chatSession.create({
            data:{
                user:{
                    connect:{
                        id: userId
                    }
                }
            }
        })
    }
    

    async getUserSessions(userId: number): Promise<ChatSession[]> {
        return await this.prisma.chatSession.findMany({
            where:{
                userId: userId,
                
            },
            include:{
                message: true
            }
        })
    }

    async saveMessage(userId: number, sessionId: number,content:string, aiResponse: string): Promise<Message> {
        return  await this.prisma.message.create({
            data:{
                userId,sessionId, content,aiResponse
            }
        });
    }
}
