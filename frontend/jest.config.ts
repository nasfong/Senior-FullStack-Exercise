export default {
  testEnvironment: "jest-environment-jsdom", 
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // [optional] Are you using aliases?
  },
};
