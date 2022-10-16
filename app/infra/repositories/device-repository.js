
const Device = require('../../domain/models/DeviceModel')

async function getDeviceData(serialNumber) {
    try {
        const config = await Device.findOne({ serialNumber })
        return config
    } catch (error) {
        throw error
    }
}

async function saveDeviceData(data) {
    try {
        const newData = new Device(data)
        await newData.save().then((data) => console.log(`${JSON.stringify(data)} stored`))
    } catch (error) {
        throw error
    }
}

module.exports = { getDeviceData, saveDeviceData }