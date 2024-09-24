/** @type {import('jest').Config} */
export default {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.+)": "<rootDir>/src/$1",
    '__mocks__/(.+)': '<rootDir>/__mocks__/$1'
  },
  setupFilesAfterEnv: ["<rootDir>/node_modules/@testing-library/jest-dom"],
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "clover",
    "html"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/services/",
    "<rootDir>/src/router/",
    "<rootDir>/src/config/",
    "<rootDir>/src/utils/",
    "<rootDir>/src/utils/",
    "<rootDir>/src/assets/",
    "\\.styles\\.ts$"
  ],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
  ],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },
  globals: {
    "ts-jest": {
      "tsconfig": "tsconfig.json"
    }
  }
};
