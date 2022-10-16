jest.mock('../../app/infra/repositories/config-repository');
const { getConfig: getConfigFromRepo } = require('../../app/infra/repositories/config-repository')
const { getConfig } = require('../../app/use-cases/get-config-uc')

describe('getConfigUseCase', () => {
    it('should get the config', async () => {
        getConfigFromRepo.mockImplementation(() => { return { config: {} } });
        const result = await getConfig("connect")
        expect(result).toEqual({ config: {} })
    })

    it('should throw an error if there is an error in the repo', async () => {
        getConfigFromRepo.mockImplementation(() => { return new Error() });
        try {
            await getConfig("connect")
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })
});
