const commonConfig = require("./common.config.cjs");

/** @type {import('jest').Config} */
const config = {
  ...commonConfig,
  displayName: "parallel",
  roots: ["../src"],
  setupFilesAfterEnv: ["<rootDir>/parallel.setup.ts"],
};

module.exports = config;
