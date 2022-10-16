
const configRepository = require('../infra/repositories/config-repository')

async function getConfig(deviceName) {
    try {
        const config = await configRepository.getConfig(deviceName)
        return config
    } catch (error) {
        throw error;
    }
}

module.exports = { getConfig }