import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET_KEY, {
    expiresIn: "2h",
  });
};
