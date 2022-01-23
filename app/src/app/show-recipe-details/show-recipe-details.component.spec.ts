import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRecipeDetailsComponent } from './show-recipe-details.component';

describe('ShowRecipeDetailsComponent', () => {
  let component: ShowRecipeDetailsComponent;
  let fixture: ComponentFixture<ShowRecipeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRecipeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
