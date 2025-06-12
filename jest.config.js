export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Handle TypeScript files
    '^.+\\.yaml$': '<rootDir>/yamlTransformer.js', // Custom transformer for YAML files
    '^.+\\.yml$': '<rootDir>/yamlTransformer.js', // Custom transformer for YML files
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock for CSS and SCSS files
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock for image files
  },
};