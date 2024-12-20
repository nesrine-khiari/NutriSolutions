import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBackgroundComponent } from './page-background.component';

describe('PageBackgroundComponent', () => {
  let component: PageBackgroundComponent;
  let fixture: ComponentFixture<PageBackgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageBackgroundComponent]
    });
    fixture = TestBed.createComponent(PageBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
