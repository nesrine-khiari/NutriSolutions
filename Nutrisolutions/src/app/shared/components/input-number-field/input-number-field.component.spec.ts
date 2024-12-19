import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberFieldComponent } from './input-number-field.component';

describe('InputNumberFieldComponent', () => {
  let component: InputNumberFieldComponent;
  let fixture: ComponentFixture<InputNumberFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputNumberFieldComponent]
    });
    fixture = TestBed.createComponent(InputNumberFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
