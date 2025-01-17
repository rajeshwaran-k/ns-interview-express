import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDTO<T extends Object>(cls: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const obj = plainToClass(cls, req.body);
    const errors = await validate(obj);

    if (errors.length > 0) {
      const message = errors
        .map(
          (error) =>
            `${error.property}: ${Object.values(error.constraints!).join(", ")}`
        )
        .join(", ");
      res.status(400).json({ message });
    } else {
      next();
    }
  };
}
