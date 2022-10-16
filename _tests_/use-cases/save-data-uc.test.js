jest.mock('../../app/infra/repositories/device-repository');
const { saveDeviceData: saveDeviceDataFromRepo } = require('../../app/infra/repositories/device-repository')
const { saveDeviceData } = require('../../app/use-cases/save-data-uc')

describe('saveDeviceDataUseCase', () => {
    it('should store the device', async () => {
        saveDeviceDataFromRepo.mockImplementation(() => { });
        const result = await saveDeviceData("123456789")
        expect(result).toEqual(undefined)
    })

    it('should throw an error if there is an error in the repo', async () => {
        saveDeviceDataFromRepo.mockImplementation(() => { return new Error() });
        try {
            await saveDeviceData({ data: "data" })
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })
});
