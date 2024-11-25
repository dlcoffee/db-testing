import { jest, beforeAll, afterAll } from "@jest/globals";
import { Kysely, PostgresDialect, sql } from "kysely";
import { Pool, PoolConfig } from "pg";
import { faker } from "@faker-js/faker";
import { db, poolConfig, type Database } from "../src/database";
import { migrate } from "./db-utils";

// set up a new test database
jest.mock("../src/database", () => {
  const original =
    jest.requireActual<typeof import("../src/database")>("../src/database");

  const dbName = `${faker.word.adjective()}_${faker.word.noun()}`.replace(
    "-",
    "_",
  );

  const poolConfig: PoolConfig = {
    ...original.poolConfig,
    database: dbName,
  };

  const dialect = new PostgresDialect({
    pool: new Pool(poolConfig),
  });

  const db = new Kysely<Database>({ dialect });

  return { ...original, poolConfig, dialect, db };
});

// create a separate connection for db setup/teardown
let { database: _, ...setupPoolConfig } = poolConfig;
const setupDb = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool(setupPoolConfig),
  }),
});

const dbName = poolConfig.database!;

// set up connections and run migrations
beforeAll(async () => {
  try {
    const dropIfExistsQuery =
      sql`DROP DATABASE IF EXISTS ${sql.raw(dbName)}`.compile(setupDb);
    await setupDb.executeQuery(dropIfExistsQuery);

    const createDbQuery = sql`CREATE DATABASE ${sql.raw(dbName)}`.compile(
      setupDb,
    );
    await setupDb.executeQuery(createDbQuery);

    await migrate();
  } catch (err) {
    console.error(`[parallel.setup.ts] could not set up db successfully`, err);
    await db.destroy();
    await setupDb.destroy();
    process.exit(1);
  }
});

afterAll(async () => {
  try {
    await db.destroy(); // close connection before dropping the db

    const dropIfExistsQuery =
      sql`DROP DATABASE IF EXISTS ${sql.raw(dbName)}`.compile(setupDb);
    await setupDb.executeQuery(dropIfExistsQuery);

    await setupDb.destroy();
  } catch (err) {
    console.error(
      `[parallel.setup.ts] could not tear down db successfully`,
      err,
    );
    process.exit(1);
  }
});
