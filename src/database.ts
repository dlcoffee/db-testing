import { Pool, PoolConfig } from "pg";
import { Kysely, PostgresDialect, ColumnType, Generated } from "kysely";

export interface Database {
  users: UsersTable;
}

export interface UsersTable {
  id: Generated<number>;
  name: string;
  email: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export const poolConfig: PoolConfig = {
  database: "db_testing",
  host: "localhost",
  user: "postgres",
  password: "password",
  port: 5432,
  max: 10,
};

export const dialect = new PostgresDialect({
  pool: new Pool(poolConfig),
});

export const db = new Kysely<Database>({
  dialect,
});
