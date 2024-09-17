import { TestBed } from '@angular/core/testing';

import { PorkService } from './pork.service';

describe('PorkService', () => {
  let service: PorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
