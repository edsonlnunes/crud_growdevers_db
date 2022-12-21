const jestConfig = require('./jest.config')

const unitConfig = {
    testMatch: ['**/*.spec.ts'],
    ...jestConfig
}

module.exports = unitConfig