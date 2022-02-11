import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDashboardPageComponent } from './total-dashboard-page.component';

describe('TotalDashboardPageComponent', () => {
  let component: TotalDashboardPageComponent;
  let fixture: ComponentFixture<TotalDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalDashboardPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
