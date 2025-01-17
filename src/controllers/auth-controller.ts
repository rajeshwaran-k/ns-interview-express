import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
import { getEntityManager } from "../db";
import { generateToken } from "../utils/jwt-utils";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const em = await getEntityManager();

  const existingUser = await em.findOne(User, { email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await em.persistAndFlush(user);

    const token = generateToken(user);

    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const em = await getEntityManager();

  const user = await em.findOne(User, { email });
  if (user) {
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid email or password" });
      }

      const token = generateToken(user);

      res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
};
