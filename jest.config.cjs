module.exports = {
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    transformIgnorePatterns: ["/node_modules/"],  
    testMatch: ['**/tests/**/*.test.js'],
    collectCoverage: true,
    coverageDirectory: "coverage",         // Directory where coverage reports will be output
    coverageReporters: ['json', 'lcov', 'text', 'clover'],  // Types of coverage reports (json, html, lcov, etc.)
  };