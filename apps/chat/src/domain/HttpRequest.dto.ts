import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class ChatMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class SendMessage {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  chatId: number;
}
