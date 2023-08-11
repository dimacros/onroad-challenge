import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Chat, ChatMessage, ChatParticipant, ChatType } from '../domain/Chat.dto';
import { Staff } from '../domain/Staff.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
    @InjectRepository(ChatParticipant)
    private readonly chatParticipantRepo: Repository<ChatParticipant>,
  ) {}

  addChatMessage(chat: Chat, message: ChatMessage) {
    chat.messages.push(message);

    return this.chatRepo.save(chat);
  }

  getChatsBy(particpant: Staff) {
    return this.chatParticipantRepo.find({
      where: {
        participant: {
          id: particpant.id,
        },  
      },
      relations: ['chat'],
    });
  }

  getChatById(id: number) {
    return this.chatRepo.findOne({
      where: {
        id,
      },
      relations: {
        messages: {
          sender: true,
        },
        participants: true,
      },
    });
  }

  createChatBetween(owner: Staff, participant: Staff, content?: string) {
    const participants = this.chatParticipantRepo.create([
      { participant: owner, personalChatName: participant.firstName },
      { participant, personalChatName: owner.firstName },
    ]);

    const chat = this.chatRepo.create({
      type: ChatType.PERSONAL,
      participants: participants,
      messages: content ? [ChatMessage.create(content, owner)] : [],
    });

    return this.chatRepo.save(chat);
  }

  getChatBetween(owner: Staff, participant: Staff) {
    return this.chatRepo.findOne({
      where: {
        type: ChatType.PERSONAL,
        participants: {
          participantId: In([owner.id, participant.id]),
        }
      },
      relations: {
        messages: {
          sender: true,
        },
        participants: true,
      },
    });
  }
}
