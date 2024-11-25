import { defineConfig } from "kysely-ctl";
import { dialect } from "../src/database";

export default defineConfig({
  dialect,
  migrations: {
    migrationFolder: "migrations",
  },
  //   plugins: [],
  //   seeds: {
  //     seedFolder: "seeds",
  //   }
});
