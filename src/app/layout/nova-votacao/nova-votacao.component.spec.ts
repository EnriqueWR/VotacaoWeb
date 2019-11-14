import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaVotacaoComponent } from './nova-votacao.component';

describe('NovaVotacaoComponent', () => {
  let component: NovaVotacaoComponent;
  let fixture: ComponentFixture<NovaVotacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaVotacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaVotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
