import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsItemComponent } from './recipe-details-item.component';

describe('RecipeDetailsItemComponent', () => {
  let component: RecipeDetailsItemComponent;
  let fixture: ComponentFixture<RecipeDetailsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeDetailsItemComponent]
    });
    fixture = TestBed.createComponent(RecipeDetailsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
