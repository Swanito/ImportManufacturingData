const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose")

const Header = new mongoose.Schema({
    name: String,
    ignore: Boolean,
    dbName: String,
    criteria: String,
    type: String
})

const ConfigSchema = new mogoose.Schema({
    device: String,
    headers: [Header]
})

const Config = mogoose.model("Config", ConfigSchema);

module.exports = Config