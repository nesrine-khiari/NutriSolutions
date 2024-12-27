import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistItemComponent } from './nutritionist-item.component';

describe('NutritionistItemComponent', () => {
  let component: NutritionistItemComponent;
  let fixture: ComponentFixture<NutritionistItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionistItemComponent]
    });
    fixture = TestBed.createComponent(NutritionistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
