import { TestBed } from '@angular/core/testing';

import { NutritionistsService } from './nutritionists.service';

describe('NutritionistsService', () => {
  let service: NutritionistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
