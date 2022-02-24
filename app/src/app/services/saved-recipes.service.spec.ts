import { TestBed } from '@angular/core/testing';

import { SavedRecipesService } from './saved-recipes.service';

describe('SavedRecipesService', () => {
  let service: SavedRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
