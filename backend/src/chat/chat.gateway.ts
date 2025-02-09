import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server,Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { AiService } from "src/ai/ai.service";



@WebSocketGateway({cors: true, path: "/socket.io"})
export class ChatGateway {

    @WebSocketServer()
    server: Server

    constructor(
        private chatService:ChatService,
        private aiService:AiService
    ){}

    @SubscribeMessage("sendMessage")
    async handleMessage(
        @MessageBody() data:{sessionId: number,userId: number, message: string},
        @ConnectedSocket() client: Socket
){
  const aiResponse= await this.aiService.generateResponse(data.message);
  await this.chatService.saveMessage(data.sessionId, {id: data.sessionId} as any, data.message, aiResponse);

  this.server.to(client.id).emit("receiveMessage",{userMessage:data.message, aiResponse})
}
}