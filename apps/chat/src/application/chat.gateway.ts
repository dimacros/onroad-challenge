import { UsePipes, ValidationPipe } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { SendMessage } from "../domain/HttpRequest.dto";
import { SharedService } from "@app/shared";
import { Staff } from "../domain/Staff.dto";
import { ChatMessage } from "../domain/Chat.dto";

@WebSocketGateway({
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    readonly chatService: ChatService,
    readonly sharedService: SharedService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('CONNECTED', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('DISCONNECT', typeof client);
  }

  @UsePipes(ValidationPipe)
  @SubscribeMessage('new_message')
  async handleNewMessage(
    @MessageBody() message: SendMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.sharedService.parseJwt(client.handshake.auth.token);
    const owner = Staff.fromUser(user);
    const chatMessage = ChatMessage.create(message.content, owner);

    const chat = await this.chatService.getChatById(message.chatId);
    
    if (! chat) {
      throw new WsException('Chat not found');
    }

    await this.chatService.addChatMessage(chat, chatMessage);

    return this.server.emit('message_sent', chatMessage);
  }
}