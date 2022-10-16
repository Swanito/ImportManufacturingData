const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose")

const DeviceSchema = new mogoose.Schema({
    BLPassword: String,
    serialNumber: { type: String, required: true, unique: true },
    skuNumber: String,
    macAddressWiFi: String,
    shipDate: Date,
    augfirmare: String,
    battSerialNumber: String
})

const Device = mogoose.model("Device", DeviceSchema);

module.exports = Device