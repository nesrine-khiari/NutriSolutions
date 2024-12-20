import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteItemComponent } from './recette-item.component';

describe('RecetteItemComponent', () => {
  let component: RecetteItemComponent;
  let fixture: ComponentFixture<RecetteItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecetteItemComponent]
    });
    fixture = TestBed.createComponent(RecetteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
