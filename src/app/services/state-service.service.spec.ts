import { TestBed } from '@angular/core/testing';

import { StateServiceService } from './stateService';

describe('StateServiceService', () => {
  let service: StateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
