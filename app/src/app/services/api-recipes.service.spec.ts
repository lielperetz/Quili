import { TestBed } from '@angular/core/testing';

import { ApiRecipesService } from './api-recipes.service';

describe('ApiRecipesService', () => {
  let service: ApiRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
