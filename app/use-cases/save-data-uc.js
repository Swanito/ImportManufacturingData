const deviceRepository = require("../infra/repositories/device-repository");

async function saveDeviceData(data) {
    try {
        return await deviceRepository.saveDeviceData(data)
    } catch (error) {
        throw error
    }
}

module.exports = { saveDeviceData }