import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistsListComponent } from './nutritionists-list.component';

describe('NutritionistsListComponent', () => {
  let component: NutritionistsListComponent;
  let fixture: ComponentFixture<NutritionistsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionistsListComponent]
    });
    fixture = TestBed.createComponent(NutritionistsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
