module.exports = {
  setupFiles: ["./jest.setup.js"],
  verbose: true,
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "vue"],
  snapshotSerializers: ["jest-serializer-vue"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  globals: {
    "vue-jest": {
      babelConfig: true,
    },
  },
};
