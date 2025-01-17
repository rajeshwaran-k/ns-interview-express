import "reflect-metadata";
import express from "express";
import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";
import authRoutes from "./routes/auth-routes";
import chatRoutes from "./routes/chat-routes";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
