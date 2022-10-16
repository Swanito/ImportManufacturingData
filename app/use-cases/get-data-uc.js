const deviceRepository = require("../infra/repositories/device-repository");

async function getDeviceData(serialNumber) {
    try {
        return await deviceRepository.getDeviceData(serialNumber)
    } catch (error) {
        throw error
    }
}

module.exports = { getDeviceData }