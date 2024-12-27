import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistsTableComponent } from './nutritionists-table.component';

describe('NutritionistsTableComponent', () => {
  let component: NutritionistsTableComponent;
  let fixture: ComponentFixture<NutritionistsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionistsTableComponent]
    });
    fixture = TestBed.createComponent(NutritionistsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
