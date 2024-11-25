import { afterAll } from "@jest/globals";
import { db } from "../src/database";

afterAll(async () => {
  // close database connections so the tests can exit
  await db.destroy();
});
