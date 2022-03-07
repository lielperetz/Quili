import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import {
  ScheduleComponent, MonthService, View, PopupOpenEventArgs, PopupCloseEventArgs, addYears, ActionEventArgs, SelectEventArgs, addDays, addMonths
} from '@syncfusion/ej2-angular-schedule';
import { closest, Internationalization } from '@syncfusion/ej2-base';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../classes/Recipe';
import { SchedulesService } from '../services/schedules.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SavedRecipesService } from '../services/saved-recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [MonthService],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;
  public currentView: View = 'Month';
  public listRecipes: Record<string, any>[];
  public recipesForDay: Record<string, any>[];
  public searchWord: string = "";
  public listRecipesBySearch: Record<string, any>;
  public newRecipe: Recipe;
  public rowAutoHeight: boolean = true;
  public selectedDate1: Date = new Date();
  public selectedDate2: Date = new Date();
  public listSelectedRecipes = [];

  public showOrHidePopup: boolean = false;
  public currentDay: Date;
  public deletePopup: boolean = false;
  public deleteOptions: number;
  public idDeleteRecipe: number;

  constructor(
    private recipeService: RecipesService,
    private schedulesService: SchedulesService,
    public router: Router,
    public savedRecipes: SavedRecipesService
  ) {
    this.getOriginalData();
  }

  public ngOnInit(): void {
  }

  async getOriginalData(d1?: Date, d2?: Date): Promise<void> {
    this.schedulesService.GetRecipesByUser(d1 ? d1 : new Date(2022, 2, 1), d2 ? d2 : addMonths(new Date(), 1)).subscribe(
      (response: any) => {
        if (response.Status) {
          this.listRecipes = response.Data as Record<string, any>[];
          this.fillListSelect();
          if (this.scheduleObj)
            this.scheduleObj.refreshLayout();
        }
        else
          console.log(response.Error)
      })
    if (this.scheduleObj) {
      this.scheduleObj.showQuickInfo = true;
      this.scheduleObj.closeQuickInfoPopup();
    }
  }

  public onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'dateNavigate') {
      var datesView = this.scheduleObj.getCurrentViewDates();
      let d1: Date = datesView[0];
      let d2: Date = datesView[datesView.length - 1];
      this.getOriginalData(d1, d2);
    }
  }

  public getHeaderStyles(data: Record<string, any>): Record<string, any> {
    return { 'align-items': 'center', color: '#919191' };
  }

  public getHeaderTitle(data: Record<string, any>): string {
    return 'Add Recipe';
  }

  public getRecipesForDay(date1: Date): Record<string, any>[] {
    this.recipesForDay = [];
    this.listRecipes?.forEach((x: any) => {
      date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      let xDate: Date = new Date(x.Date);
      xDate = new Date(xDate.getFullYear(), xDate.getMonth(), xDate.getDate())
      if (date1.toString() == xDate.toString()) {
        this.recipesForDay.push(x as Record<string, any>);
        x.isSaved = this.isSaved(x.RecipeId);
      }
    })
    return this.recipesForDay;
  }

  public parseDate(dateString: string): Date {
    if (dateString)
      return new Date(new Date(dateString).setHours(0));
    return null;
  }

  public searchRecipe(e): void {
    this.recipeService.SearchRecipe(e).subscribe(
      (response: any) => {
        if (response.Status) {
          this.listRecipesBySearch = response.Data.results as Record<string, any>[];
          if (this.listRecipesBySearch.length === 0)
            this.listRecipesBySearch = null
        }
        else
          alert(response.Error)
      })
  }

  public chooseRecipe(id: string): void {
    let chosenRecipe = this.listRecipesBySearch?.find((x: any) => x.id === id) as Record<string, any>;
    this.newRecipe.RecipeId = chosenRecipe.id;
    this.newRecipe.RecipeTitle = chosenRecipe.title;
    this.newRecipe.RecipeImage = chosenRecipe.image;
    this.listRecipesBySearch = null;
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor' || this.showOrHidePopup)
      args.cancel = true;
    this.listRecipesBySearch = null;
    this.searchWord = "";
    this.newRecipe = new Recipe()
    this.newRecipe.SchedulingStatuse = 1;
    this.newRecipe.Date = new Date(args.data.startTime);
  }

  // public onPopupClose(args: PopupCloseEventArgs): void {
  //   this.searchWord = "";
  // }

  public buttonClickActions(e: Event, id?: number): void {
    if ((e.target as HTMLElement).id === 'save') {
      this.newRecipe.Date = this.newRecipe.Date ? this.newRecipe.Date : new Date();
      this.newRecipe.SchedulingStatuse = this.newRecipe.SchedulingStatuse ? this.newRecipe.SchedulingStatuse : 1;
      this.recipeService.AddRecipe(this.newRecipe).subscribe(
        (response: any) => {
          if (response.Status) {
            this.getOriginalData();
            this.scheduleObj.refreshTemplates();
          }
          else
            alert(response.Error)
        })
      this.newRecipe = new Recipe();
    } else if ((e.target as HTMLElement).id === 'delete') {
      let rec: number = 1; //delete recipe
      if ((e.target as HTMLElement).innerHTML === 'Entire Series')
        rec = 2; //delete series
      else if ((e.target as HTMLElement).innerHTML === 'Following Recipes')
        rec = 3; //delete following recipes

      this.schedulesService.RemoveSchedules(this.idDeleteRecipe, rec).subscribe(
        (response: any) => {
          if (response.Status) {
            this.getOriginalData();
          }
          else
            alert(response.Error)
        })
      this.deletePopup = false;
    }
    this.scheduleObj.closeQuickInfoPopup();
  }

  public onSelect(args: SelectEventArgs) {
    if (args.requestType === 'cellSelect') {
      this.selectedDate1 = (args.data as Record<string, any>).StartTime as Date;
      this.selectedDate2 = (args.data as Record<string, any>).EndTime as Date;
      this.selectedDate2.setDate(this.selectedDate2.getDate() - 1);
      this.fillListSelect();
    }
  }

  public fillListSelect() {
    this.selectedDate1 = new Date(this.selectedDate1.getFullYear(), this.selectedDate1.getMonth(), this.selectedDate1.getDate());
    this.selectedDate2 = new Date(this.selectedDate2.getFullYear(), this.selectedDate2.getMonth(), this.selectedDate2.getDate());
    this.listSelectedRecipes = [];
    for (let index = this.selectedDate1; index <= this.selectedDate2; index = addDays(index, 1)) {
      if (this.getRecipesForDay(index).length > 0) {
        this.listSelectedRecipes.push(this.getRecipesForDay(index))
      }
    }
  }

  public getRepeatStatus(n: number) {
    switch (n) {
      case 1:
        return 'Never'
      case 2:
        return 'Weekly'
      case 3:
        return 'Monthly'
    }
  }

  public noRecipes(): boolean {
    if ((this.listSelectedRecipes as []).length === 0) {
      return true;
    }
    return false;
  }

  public isSaved(id: string) {
    if (this.savedRecipes.savedRecipes?.filter(x => x.Id === id)[0])
      return true;
    return false;
  }

  // async getRecipe(id: string) {
  //   let recipe = null;
  //   this.recipeService.GetRecipeById(id).subscribe(
  //     (response: any) => {
  //       if (response.Status) {
  //         recipe = response.Data;
  //       }
  //       else
  //         alert(response.Error);
  //     })
  //   return recipe;
  // }

  // public handleAdd(id) {
  //   let recipe = this.getRecipe(id);
  //   console.log(recipe)
  // if (recipe) {
  //   this.savedRecipes.AddToSavedRecipes(recipe).subscribe(
  //     (res: any) => {
  //       if (res.Status) {
  //         // recipe.isSaved = true;
  //         this.savedRecipes.numSaved++;
  //         Swal.fire({
  //           title: 'Success!',
  //           text: "was successfully added.",
  //           // text: recipe.Title + " was successfully added.",
  //           icon: 'success',
  //           iconColor: 'orange',
  //           timer: 3000,
  //           showConfirmButton: false
  //         })
  //       }
  //       else
  //         alert(res.Error)
  //     })
  // }
  // }

  // public handleRemove(id) {
  //   let recipe = this.listRecipes.filter(x => x.RecipeId === id)[0];
  //   Swal.fire({
  //     title: 'Are you sure you want to delete this recipe?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Ok',
  //     cancelButtonText: 'Cancal'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.savedRecipes.RemoveSavedRecipe(id).subscribe(
  //         (res: any) => {
  //           if (res.Status) {
  //             Swal.fire({
  //               title: 'Deleted!',
  //               text: recipe.RecipeTitle + ' was successfully deleted.',
  //               icon: 'success',
  //               iconColor: 'orange',
  //               timer: 3000,
  //               showConfirmButton: false
  //             })
  //             this.savedRecipes.numSaved--;
  //           }
  //           else
  //             console.log(res.Error);
  //         })
  //     }
  //   })
  // }

  public delete(id?: number) {
    var l = this.listRecipes.filter(x => x.Code == id)[0] as Record<string, any>;
    this.deleteOptions = 1; //delete recipe
    if (l.SchedulingStatuse != 1)
      if (l.RecipeDate === l.Date)
        this.deleteOptions = 2; //delete this recipe or entire series
      else
        this.deleteOptions = 3; //delete this recipe, following recipes or entire series
    this.deletePopup = true;
  }
}
