import { TestBed } from '@angular/core/testing';

import { MachineDetailsServiceService } from './machine-details-service.service';

describe('MachineDetailsServiceService', () => {
  let service: MachineDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
