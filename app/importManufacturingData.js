
const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs')
const readline = require('readline')
const { getConfig } = require('./use-cases/get-config-uc')
const mongoPool = require('./config/db-builder');
const { getDeviceData } = require('./use-cases/get-data-uc');
const { saveDeviceData } = require('./use-cases/save-data-uc');
const { convertRowToObject } = require('./use-cases/convert-row-to-object');
const { criteriaValidator, requiredHeadersValidator, missingColumnsValidator } = require('./common/validators');

(async function run() {
    await mongoPool.connect();

    const args = process.argv.slice(2)
    const [deviceType, filePath] = args

    if (deviceType === undefined || filePath === undefined) {
        throw Error("device type and file path args must be specified")
    }

    try {
        const config = await getConfig(deviceType)
        if (!config) throw Error(`Config not found for device ${deviceType}`)

        const fileStream = fs.createReadStream(filePath)
        const reader = readline.createInterface({ input: fileStream })
        const fileRows = []
        const totalFailures = []
        const ignoredRows = []

        reader.on("line", (row) => {
            const rowCleaned = row.split(',').flatMap((el) => el.trim().replaceAll('"', ''))
            fileRows.push(rowCleaned)
        })

        reader.on('close', async () => {

            const headers = fileRows[0]

            requiredHeadersValidator(headers, config.headers)

            //map the csv to a json map
            for (let i = 1; i < fileRows.length; i++) {
                const row = fileRows[i]
                const rowIndex = i

                missingColumnsValidator(row, i, headers)

                const obj = convertRowToObject(row, headers)

                const validatedData = criteriaValidator(obj, config)
                const currentFailures = validatedData.filter((data) => !data.success)
                if (currentFailures.length > 0) {
                    totalFailures.push({
                        failure: {
                            row: obj,
                            reasons: currentFailures.map((f) => f.reason)
                        }
                    })
                } else {
                    const isDeviceAlreadyStored = await getDeviceData(obj.serialNumber)
                    if (isDeviceAlreadyStored === null) {
                        await saveDeviceData(obj)
                    } else {
                        ignoredRows.push(obj)
                    }
                }
            }

            console.log(`Total rows: ${fileRows.length - 1}`)
            console.log(`Ignored count: ${ignoredRows.length}`)
            console.log(`Failure count: ${totalFailures.length}`)
            console.log(`Success count: ${fileRows.length - 1 - totalFailures.length - ignoredRows.length}`)
            console.log(`Failure details: ${JSON.stringify(totalFailures, null, 2)}`)
            process.exit()
        })
    } catch (error) {
        throw Error(error)
    }
})()


