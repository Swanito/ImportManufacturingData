
const Config = require('../../domain/models/ConfigModel')

async function getConfig(deviceName) {
    try {
        const config = await Config.findOne({ device: deviceName })
        return config
    } catch (error) {
        throw error
    }
}

module.exports = { getConfig }