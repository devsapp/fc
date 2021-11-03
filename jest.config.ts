/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverage: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/*.test.ts'],
  // testPathIgnorePatterns: ['./test/fixtures'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  modulePathIgnorePatterns: ['<rootDir>/examples'],
};
