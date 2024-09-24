import { TestBed } from '@angular/core/testing';

import { ProductuserService } from './productuser.service';

describe('ProductuserService', () => {
  let service: ProductuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
