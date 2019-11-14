import { TestBed } from '@angular/core/testing';

import { OmniFireService } from './omni-fire.service';

describe('OmniFireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OmniFireService = TestBed.get(OmniFireService);
    expect(service).toBeTruthy();
  });
});
