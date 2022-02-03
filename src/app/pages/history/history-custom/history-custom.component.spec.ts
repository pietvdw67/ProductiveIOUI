import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCustomComponent } from './history-custom.component';

describe('HistoryCustomComponent', () => {
  let component: HistoryCustomComponent;
  let fixture: ComponentFixture<HistoryCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
