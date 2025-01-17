import { Request, Response } from "express";
import { getEntityManager } from "../db";

import { validate } from "class-validator";
import xlsx from "xlsx";
import { compact, difference, keyBy, uniq } from "lodash";
import { User } from "../entities/user.entity";
import { ChatHistory } from "../entities/chat-history.entity";
import { ChatImportDTO } from "../dto/chat-dto";
import { plainToClass } from "class-transformer";

export const importChatHistory = async (req: Request, res: Response) => {
  const em = await getEntityManager();

  if (req.file) {
    try {
      const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data: any[] = xlsx.utils.sheet_to_json(sheet);

      const allEmails = compact(
        data.flatMap((row) => [row.sender, row.receiver])
      );
      const uniqueEmails = uniq(allEmails);

      const users = await em.find(User, { email: { $in: uniqueEmails } });

      const foundEmails = users.map((user) => user.email);
      const missingEmails = difference(uniqueEmails, foundEmails);

      // validate
      if (missingEmails.length > 0) {
        res.status(400).json({
          message: "Some users do not exist in the database",
          missingEmails,
        });
        return;
      }

      const userMap = keyBy(users, "email");

      const chatHistories: ChatHistory[] = [];

      for (const row of data) {
        console.log({ row });
        const dto = plainToClass(ChatImportDTO, row);
        const errors = await validate(dto);
        if (errors.length > 0) {
          res.status(400).json({
            message: "Validation failed",
            details: errors.map((err) => ({
              property: err.property,
              constraints: err.constraints,
            })),
          });
        }

        const sender = userMap[dto.sender];
        const receiver = userMap[row.receiver];

        const chatHistory = new ChatHistory(
          dto.message,
          new Date(dto.timestamp),
          sender,
          receiver,
          dto.messageType,
          dto.isRead || null,
          dto.url || null
        );

        chatHistories.push(chatHistory);
      }

      await em.persistAndFlush(chatHistories);

      res
        .status(201)
        .json({ message: "Chat history imported successfully", chatHistories });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.status(400).json({ message: "No file uploaded" });
  }
};
