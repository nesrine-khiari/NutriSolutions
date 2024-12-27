import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingPatientComponent } from './upcoming-patient.component';

describe('UpcomingPatientComponent', () => {
  let component: UpcomingPatientComponent;
  let fixture: ComponentFixture<UpcomingPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingPatientComponent]
    });
    fixture = TestBed.createComponent(UpcomingPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
