module.exports = {
  // Specify the root directory
  rootDir: "./src",
  testEnvironment: "jsdom",
  // Setup files to run before each test
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  // Specify module file extensions
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],

  // Transform files with ts-jest for TypeScript support
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.css$": "jest-transform-css",
  },

  // Optional: Define coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Optional: Specify extensions to treat as ESM
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  // Other Jest configurations...
};
