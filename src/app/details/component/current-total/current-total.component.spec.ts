import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTotalComponent } from './current-total.component';

describe('CurrentTotalComponent', () => {
  let component: CurrentTotalComponent;
  let fixture: ComponentFixture<CurrentTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
