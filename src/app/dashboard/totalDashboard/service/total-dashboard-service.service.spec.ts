import { TestBed } from '@angular/core/testing';

import { TotalDashboardServiceService } from './total-dashboard-service.service';

describe('TotalDashboardServiceService', () => {
  let service: TotalDashboardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalDashboardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
