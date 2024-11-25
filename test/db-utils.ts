import { promises as fs } from "fs";
import * as path from "path";
import { FileMigrationProvider, Migrator, sql } from "kysely";
import { db } from "../src/database";

export const truncateDb = async () => {
  const truncateTablesQuery =
    sql`TRUNCATE TABLE users, users RESTART IDENTITY`.compile(db);

  await db.executeQuery(truncateTablesQuery);
};

export const migrate = async () => {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, "../migrations"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Error") {
      throw new Error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error(error);
    throw new Error("failed to migrate");
  }
};
