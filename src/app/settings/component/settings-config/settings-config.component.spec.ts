import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsConfigComponent } from './settings-config.component';

describe('SettingsConfigComponent', () => {
  let component: SettingsConfigComponent;
  let fixture: ComponentFixture<SettingsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
