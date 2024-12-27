import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNutritionisteComponent } from './home-nutritioniste.component';

describe('HomeNutritionisteComponent', () => {
  let component: HomeNutritionisteComponent;
  let fixture: ComponentFixture<HomeNutritionisteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeNutritionisteComponent]
    });
    fixture = TestBed.createComponent(HomeNutritionisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
