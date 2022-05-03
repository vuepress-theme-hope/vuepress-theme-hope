const fs = require("fs");
const { resolve } = require("path");

module.exports = {
  rootDir: resolve(__dirname),
  collectCoverage: true,
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  moduleNameMapper: {
    "^dayjs/esm/(.*)$": "dayjs/$1",
  },
  projects: fs.readdirSync("./packages").map((folder) => ({
    displayName: folder,
    preset: "ts-jest/presets/js-with-babel",
    transformIgnorePatterns: ["node_modules/(?!(@vuepress/client|dayjs)/)"],
    testMatch: [`<rootDir>/packages/${folder}/__tests__/**/*.spec.{js,ts}`],
  })),
};
