import express from "express";
import { signup, login } from "../controllers/auth-controller";
import { validateDTO } from "../middleware/validate";
import { SignupDTO } from "../dto/signup-dto";
import { LoginDTO } from "../dto/login-dto";

const router = express.Router();
router.post("/signup", validateDTO(SignupDTO), signup);
router.post("/login", validateDTO(LoginDTO), login);

export default router;
