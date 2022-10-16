const { convertRowToObject } = require('../../app/use-cases/convert-row-to-object')

describe('convertRowToObjectUc', () => {
    it('should convert an array to an object', async () => {
        const row = ["A", 'B', 'C']
        const headers = ["HeaderA", "HeaderB", "HeaderC"]
        const result = convertRowToObject(row, headers)
        expect(result).toMatchObject({ HeaderA: 'A', HeaderB: 'B', HeaderC: 'C' })
    })
});
