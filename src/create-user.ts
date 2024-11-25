import { db } from "./database";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function createUser(name: string, email: string) {
  await sleep(1_000);

  const user = await db
    .insertInto("users")
    .values({ name, email })
    .executeTakeFirstOrThrow();

  return user;
}
