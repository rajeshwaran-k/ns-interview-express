import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";

let orm: MikroORM | null = null;

export const getORM = async (): Promise<MikroORM> => {
  if (!orm) {
    // Initialize MikroORM once
    orm = await MikroORM.init(config);
  }
  return orm;
};

export const getEntityManager = async () => {
  const orm = await getORM();
  return orm.em.fork(); // Fork a new EntityManager instance
};