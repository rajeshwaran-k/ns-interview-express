import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsUrl,
} from "class-validator";
import { MessageTypeEnum } from "../utils/enums";

export class ChatImportDTO {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsEmail()
  sender!: string;

  @IsEmail()
  receiver!: string;

  @IsDateString()
  @IsNotEmpty()
  timestamp!: string;

  @IsEnum(MessageTypeEnum)
  messageType!: MessageTypeEnum;

  @IsBoolean()
  isRead!: Boolean;

  @IsOptional()
  @IsUrl()
  url: string | undefined;
}
