import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterTrackingComponent } from './water-tracking.component';

describe('WaterTrackingComponent', () => {
  let component: WaterTrackingComponent;
  let fixture: ComponentFixture<WaterTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterTrackingComponent],
    });
    fixture = TestBed.createComponent(WaterTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
