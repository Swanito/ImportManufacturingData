function missingColumnsValidator(row, rowIndex, headers) {
    if (row.length !== headers.length) {
        throw Error(`Missing column at row ${rowIndex}: ${row}. Expected columns: ${headers}`)
    }
}

module.exports = missingColumnsValidator