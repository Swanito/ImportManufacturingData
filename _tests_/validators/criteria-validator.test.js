const { criteriaValidator } = require('../../app/common/validators')

describe('criteriaValidator', () => {
    it('should return success true if the criteria is met', () => {

        const obj = {
            "serialNumber": "0A1B2C3D4W",
        }

        const config = {
            headers: [{
                "name": "serialNumber",
                "ignore": false,
                "dbName": "serialNumber",
                "criteria": "^([0-9A-Z]{10})$",
                "type:": "string"
            }]
        }

        const result = criteriaValidator(obj, config)

        expect(result).toEqual(expect.arrayContaining([{ success: true }]));
    })

    it('should return success false and the error if the criteria is not met', () => {

        const obj = {
            "serialNumber": "0A1B2C3D4",
        }

        const config = {
            headers: [{
                "name": "serialNumber",
                "ignore": false,
                "dbName": "serialNumber",
                "criteria": "^([0-9A-Z]{10})$",
                "type:": "string"
            }]
        }

        const result = criteriaValidator(obj, config)

        expect(result).toEqual(expect.arrayContaining([{ "reason": "0A1B2C3D4 does not meet expected criteria ^([0-9A-Z]{10})$", "success": false }]));

    })
});
