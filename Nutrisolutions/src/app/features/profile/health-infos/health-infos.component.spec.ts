import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInfosComponent } from './health-infos.component';

describe('HealthInfosComponent', () => {
  let component: HealthInfosComponent;
  let fixture: ComponentFixture<HealthInfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthInfosComponent]
    });
    fixture = TestBed.createComponent(HealthInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
