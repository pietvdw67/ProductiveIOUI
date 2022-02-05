import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailPageComponent } from './machine-detail-page.component';

describe('MachineDetailPageComponent', () => {
  let component: MachineDetailPageComponent;
  let fixture: ComponentFixture<MachineDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
