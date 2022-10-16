const { missingColumnsValidator } = require('../../app/common/validators')

describe('missingColumnsValidator', () => {
    it('should throw an error if a column is missing', () => {
        try {
            const row = ["h0"]
            const rowIndex = 1
            const headers = ["h1", "h2"]
            missingColumnsValidator(row, rowIndex, headers)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })

    it('should not throw an error if a column is not missing', () => {
        const row = ["h0"]
        const rowIndex = 1
        const headers = ["h0"]
        const result = missingColumnsValidator(row, rowIndex, headers)
        expect(result).toEqual(undefined)
    })
});
