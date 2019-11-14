import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhasVotacoesComponent } from './minhas-votacoes.component';

describe('MinhasVotacoesComponent', () => {
    let component: MinhasVotacoesComponent;
    let fixture: ComponentFixture<MinhasVotacoesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MinhasVotacoesComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MinhasVotacoesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
