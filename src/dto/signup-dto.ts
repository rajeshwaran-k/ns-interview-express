import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}
