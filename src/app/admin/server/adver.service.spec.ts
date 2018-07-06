import { TestBed, inject } from '@angular/core/testing';

import { AdverService } from './adver.service';

describe('AdverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdverService]
    });
  });

  it('should be created', inject([AdverService], (service: AdverService) => {
    expect(service).toBeTruthy();
  }));
});
