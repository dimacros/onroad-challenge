import { OmitType } from "@nestjs/swagger";
import { Chat, ChatMessage, ChatParticipant } from "./Chat.dto";

class ChatBase extends OmitType(Chat, ['participants', 'messages']) {}

class MessageBase extends OmitType(ChatMessage, ['chat']) {}

class ParticipantBase extends OmitType(ChatParticipant, ['chat', 'participant']) {}

export class ChatResponse extends ChatBase {
  participants: ParticipantBase[];
  messages: MessageBase[];
}