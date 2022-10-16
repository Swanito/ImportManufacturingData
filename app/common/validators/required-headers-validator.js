function requiredHeadersValidator(headers, headersConfig) {
    console.log(headersConfig)
    const missingHeaders = headersConfig.filter((header) => !header.ignore).filter((header) => !headers.includes(header.name))
    if (missingHeaders.length > 0) throw Error(`missing required header(s) ${missingHeaders.map((h) => h.name)}`)
}

module.exports = requiredHeadersValidator