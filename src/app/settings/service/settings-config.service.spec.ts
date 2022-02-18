import { TestBed } from '@angular/core/testing';

import { SettingsConfigService } from './settings-config.service';

describe('SettingsConfigService', () => {
  let service: SettingsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
