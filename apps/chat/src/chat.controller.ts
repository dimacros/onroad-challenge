import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './application/chat.service';
import { AuthGuard, AuthenticatedUser } from 'nest-keycloak-connect';
import { ApiCreatedResponse, ApiOAuth2, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@app/shared/dto/User';
import { StaffService } from './application/staff.service';
import { Staff } from './domain/Staff.dto';
import { ChatResponse } from './domain/HttpResponse.dto';
import { ChatMessageDto } from './domain/HttpRequest.dto';

@ApiOAuth2([])
@ApiTags('Chat')
@UseGuards(AuthGuard)
@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly staffService: StaffService,
  ) {}

  @ApiOkResponse({ type: Staff })
  @Get('/chat/contacts')
  async getContacts(@AuthenticatedUser() requestingPerson: User) {
    const owner = await this.staffService.findOrCreateFor(requestingPerson);
    const contacts = await this.staffService.findAll();

    return contacts.filter(contact => contact.id !== owner.id);
  }

  @ApiCreatedResponse({ type: ChatResponse, description: 'Start a conversation with a contact.' })
  @Post('/chat/conversations/:contactId')
  async createChatConversation(
    @Param('contactId') contactId: string,  
    @AuthenticatedUser() requestingPerson: User,
    @Body() body: ChatMessageDto
  ) {
    const owner = await this.staffService.findOrCreateFor(requestingPerson);
    const contact = await this.staffService.findOne(contactId);

    if (! contact) {
      throw new NotFoundException('Person not found');
    }

    if (contact.id === owner.id) {
      throw new ForbiddenException('You cannot chat with yourself');
    }

    return this.chatService.createChatBetween(owner, contact, body.content);
  }

  @ApiOkResponse({ type: ChatResponse })
  @Get('/chat/conversations/:contactId')
  async getChatConversation(
    @Param('contactId') contactId: string,  
    @AuthenticatedUser() requestingPerson: User
  ) {
    const owner = await this.staffService.findOrCreateFor(requestingPerson);
    const contact = await this.staffService.findOne(contactId);

    if (! contact) {
      throw new NotFoundException('Person not found');
    }

    if (contact.id === owner.id) {
      throw new ForbiddenException('You cannot chat with yourself');
    }

    return this.chatService.getChatBetween(owner, contact);
  }
}
