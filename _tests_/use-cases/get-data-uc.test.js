jest.mock('../../app/infra/repositories/device-repository');
const { getDeviceData: getDeviceDataFromRepo } = require('../../app/infra/repositories/device-repository')
const { getDeviceData } = require('../../app/use-cases/get-data-uc')

describe('getDeviceDataUseCase', () => {
    it('should get the stored device', async () => {
        getDeviceDataFromRepo.mockImplementation(() => { return { device: {} } });
        const result = await getDeviceData("123456789")
        expect(result).toEqual({ device: {} })
    })

    it('should throw an error if there is an error in the repo', async () => {
        getDeviceDataFromRepo.mockImplementation(() => { return new Error() });
        try {
            await getDeviceData("123456789")
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })
});
