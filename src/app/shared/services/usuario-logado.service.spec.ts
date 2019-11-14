import { TestBed } from '@angular/core/testing';

import { UsuarioLogadoService } from './usuario-logado.service';

describe('UsuarioLogadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioLogadoService = TestBed.get(UsuarioLogadoService);
    expect(service).toBeTruthy();
  });
});
