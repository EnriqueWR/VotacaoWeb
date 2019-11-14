import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarVotacaoComponent } from './visualizar-votacao.component';

describe('NovaVotacaoComponent', () => {
  let component: VisualizarVotacaoComponent;
  let fixture: ComponentFixture<VisualizarVotacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarVotacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarVotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
