import { beforeEach, describe, it } from "@jest/globals";
import { truncateDb } from "../test/db-utils";

import createUser from "./create-user";

describe("createUser 3", () => {
  beforeEach(async () => {
    await truncateDb();
  });

  it("inserts a user into the database", async () => {
    await createUser("user", "user@email.com");
  });
});
