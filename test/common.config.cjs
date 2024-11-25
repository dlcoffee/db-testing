/** @type {import('jest').Config} */
const config = {
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        isolatedModules: true, // disable type-checking for speed
      },
    ],
  },
};

module.exports = config;
