import { TestBed, inject } from '@angular/core/testing';

import { EquipService } from './equip.service';

describe('EquipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipService]
    });
  });

  it('should be created', inject([EquipService], (service: EquipService) => {
    expect(service).toBeTruthy();
  }));
});
