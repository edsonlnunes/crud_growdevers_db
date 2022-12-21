const jestConfig = require('./jest.config')

const integrationConfig = {
    testMatch: ['**/*.test.ts'],
    ...jestConfig
}

module.exports = integrationConfig