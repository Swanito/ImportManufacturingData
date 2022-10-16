function criteriaValidator(obj, config) {
    return Object.keys(obj).map((key) => {
        const headerConfig = config.headers.filter((h) => h.name === key)
        if (!headerConfig[0].ignore && headerConfig[0].criteria) {
            const regex = new RegExp(headerConfig[0].criteria)
            const isValid = regex.test(obj[key])
            if (!isValid) {
                return {
                    "success": false,
                    "reason": `${obj[key]} does not meet expected criteria ${headerConfig[0].criteria}`
                }
            }
        }
        return {
            "success": true
        }
    })
}

module.exports = criteriaValidator