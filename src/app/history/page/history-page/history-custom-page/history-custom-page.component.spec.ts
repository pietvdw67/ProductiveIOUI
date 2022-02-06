import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCustomPageComponent } from './history-custom-page.component';

describe('HistoryCustomPageComponent', () => {
  let component: HistoryCustomPageComponent;
  let fixture: ComponentFixture<HistoryCustomPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryCustomPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryCustomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
