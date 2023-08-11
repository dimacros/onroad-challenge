import { Staff } from "./Staff.dto";

export enum ChatType {
  PERSONAL = 'personal',
  GROUP = 'group',
}

export class Chat {
  id: number;
  type: ChatType;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;

  isParticipant(participant: Staff) {
    return this.participants.some(p => p.participantId === participant.id);
  }
}

export class ChatParticipant {
  id: number;
  chat: Chat;
  participant: Staff;
  participantId: string;
  personalChatName: string;
}

export class ChatMessage {
  id: number;
  chat: Chat;
  content: string;
  sentAt: Date;
  sender: Staff;

  static create(content: string, sender: Staff) {
    const message = new ChatMessage();
    message.content = content;
    message.sender = sender;
    message.sentAt = new Date();

    return message;
  }
}