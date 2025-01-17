import { Entity, Enum, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./user.entity";
import { MessageTypeEnum } from "../utils/enums";

@Entity()
export class ChatHistory {
  @PrimaryKey()
  id!: number;

  @Property({ type: "text" })
  message!: string;

  @Property({ type: "text", nullable: true })
  url: string | null;

  @Property()
  timestamp!: Date;

  @ManyToOne()
  sender: User;

  @ManyToOne()
  receiver!: User;

  @Enum({ items: () => MessageTypeEnum })
  messageType!: MessageTypeEnum;

  @Property({ default: false })
  isRead: Boolean = false;

  constructor(
    message: string,
    timestamp: Date,
    sender: User,
    receiver: User,
    messageType: MessageTypeEnum,
    isRead: Boolean | null,
    url: string | null = null
  ) {
    this.message = message;
    this.timestamp = timestamp;
    this.sender = sender;
    this.receiver = receiver;
    this.messageType = messageType;
    this.url = url;
    this.isRead = isRead || false;
  }
}
