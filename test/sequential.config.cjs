const commonConfig = require("./common.config.cjs");

/** @type {import('jest').Config} */
const config = {
  ...commonConfig,
  displayName: "sequential",
  roots: ["../src"],
  setupFilesAfterEnv: ["<rootDir>/sequential.setup.ts"],
};

module.exports = config;
