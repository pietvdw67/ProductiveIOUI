import { TestBed } from '@angular/core/testing';

import { DataViewServiceService } from './data-view-service.service';

describe('DataViewServiceService', () => {
  let service: DataViewServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataViewServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
