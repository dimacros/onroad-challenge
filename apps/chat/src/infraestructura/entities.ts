import { EntitySchema } from "typeorm";
import { Chat, ChatMessage, ChatParticipant } from "../domain/Chat.dto";
import { Staff } from "../domain/Staff.dto";

const ChatEntity = new EntitySchema<Chat>({
  name: "Chat",
  target: Chat,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    type: {
      type: String,
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
    }
  },
  relations: {
    messages: {
      type: "one-to-many",
      target: "ChatMessage",
      inverseSide: "chat",
      cascade: true,
    },
    participants: {
      type: "one-to-many",
      target: "ChatParticipant",
      inverseSide: "chat",
    },
  },
});

const ChatMessageEntity = new EntitySchema<ChatMessage>({
  name: "ChatMessage",
  target: ChatMessage,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    content: {
      type: String,
    },
    sentAt: {
      type: Date,
    },
  },
  relations: {
    chat: {
      type: "many-to-one",
      target: "Chat",
      joinColumn: {
        name: "chatId",
        referencedColumnName: "id",
      },
      nullable: false,
    },
    sender: {
      type: "many-to-one",
      target: "Staff",
      joinColumn: {
        name: "senderId",
        referencedColumnName: "id",
      },
      nullable: false,
    },
  }
});

const ChatParticipantEntity = new EntitySchema<ChatParticipant>({
  name: "ChatParticipant",
  target: ChatParticipant,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    personalChatName: {
      type: String,
    },
    participantId: {
      type: String,
    },
  },
  relations: {
    chat: {
      type: "many-to-one",
      target: "Chat",
      joinColumn: {
        name: "chatId",
        referencedColumnName: "id",
      },
      nullable: false,
    },
    participant: {
      type: "many-to-one",
      target: "Staff",
      joinColumn: {
        name: "participantId",
        referencedColumnName: "id",
      },
      nullable: false,
    }
  },
});

const StaffEntity = new EntitySchema<Staff>({
  name: "Staff",
  target: Staff,
  columns: {
    id: {
      type:'uuid',
      primary: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
    }
  }
});

export default [
  ChatEntity,
  ChatMessageEntity,
  ChatParticipantEntity,
  StaffEntity,
];