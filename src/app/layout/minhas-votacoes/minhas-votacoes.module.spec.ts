import { MinhasVotacoesModule } from './minhas-votacoes.module';

describe('MinhasVotacoesModule', () => {
    let minhasVotacoesModule: MinhasVotacoesModule;

    beforeEach(() => {
        minhasVotacoesModule = new MinhasVotacoesModule();
    });

    it('should create an instance', () => {
        expect(minhasVotacoesModule).toBeTruthy();
    });
});
