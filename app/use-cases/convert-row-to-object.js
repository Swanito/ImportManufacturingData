function convertRowToObject(row, headers) {
    const obj = {}
    row.forEach((column, index) => {
        obj[headers[index]] = column
    })
    return obj
}

module.exports = { convertRowToObject }