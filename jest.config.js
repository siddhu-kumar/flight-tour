export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // or 'ts-jest' if you're using TypeScript
  },
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    // Add any necessary mappings for non-JS modules here
  },
};
    