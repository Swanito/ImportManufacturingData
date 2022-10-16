const { requiredHeadersValidator } = require('../../app/common/validators')

describe('requiredHeadersValidator', () => {
    it('should throw an error if a header is missing', () => {

        try {
            const headers = ["serialNumber"]

            const config = {
                headers: [{
                    "name": "testHeader",
                    "ignore": false,
                    "dbName": "serialNumber",
                    "criteria": "^([0-9A-Z]{10})$",
                    "type:": "string"
                }]
            }
            requiredHeadersValidator(headers, config.headers)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })

    it('should not throw an error if a header is not missing', () => {

        const headers = ["test"]

        const config = {
            headers: [{
                "name": "test",
                "ignore": false
            }]
        }
        const result = requiredHeadersValidator(headers, config.headers)
        expect(result).toEqual(undefined)
    })
});
