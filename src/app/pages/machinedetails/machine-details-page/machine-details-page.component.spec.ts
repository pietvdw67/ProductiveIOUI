import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailsPageComponent } from './machine-details-page.component';

describe('MachineDetailsPageComponent', () => {
  let component: MachineDetailsPageComponent;
  let fixture: ComponentFixture<MachineDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
