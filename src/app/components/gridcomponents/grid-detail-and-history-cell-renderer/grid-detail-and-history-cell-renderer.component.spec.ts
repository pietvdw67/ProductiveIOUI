import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDetailAndHistoryCellRendererComponent } from './grid-detail-and-history-cell-renderer.component';

describe('GridDetailAndHistoryCellRendererComponent', () => {
  let component: GridDetailAndHistoryCellRendererComponent;
  let fixture: ComponentFixture<GridDetailAndHistoryCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDetailAndHistoryCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDetailAndHistoryCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
