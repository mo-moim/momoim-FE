const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(svg)$": "<rootDir>/__mocks__/svg.js",
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
};

module.exports = createJestConfig(config);
