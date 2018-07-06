import { TestBed, inject } from '@angular/core/testing';

import { AdmachineService } from './admachine.service';

describe('AdmachineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdmachineService]
    });
  });

  it('should be created', inject([AdmachineService], (service: AdmachineService) => {
    expect(service).toBeTruthy();
  }));
});
