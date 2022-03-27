import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import {
  ScheduleComponent, MonthService, View, PopupOpenEventArgs, ActionEventArgs, SelectEventArgs, addDays, addMonths
} from '@syncfusion/ej2-angular-schedule';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../classes/Recipe';
import { SchedulesService } from '../services/schedules.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SavedRecipesService } from '../services/saved-recipes.service';
import { Title } from '@angular/platform-browser';
import { SiteService } from '../services/site.service';

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
  public deleteOptions: number;
  public minDate: Date = new Date(Date.now());

  constructor(
    private recipeService: RecipesService,
    private schedulesService: SchedulesService,
    public router: Router,
    public savedRecipesService: SavedRecipesService,
    public titleService: Title, private siteService: SiteService) {
    siteService.setNormal();
    this.titleService.setTitle("Meal Planner - Quili");
    this.getOriginalData();
    this.siteService.setCurrentPage("MealPlanner");
  }

  public ngOnInit(): void {
  }

  async getOriginalData(d1?: Date, d2?: Date): Promise<void> {
    this.schedulesService.GetRecipesByUser(d1 ? d1 : new Date(2022, 1, 1), d2 ? d2 : addMonths(new Date(), 1)).subscribe(
      (response: any) => {
        if (response.Status) {
          this.listRecipes = response.Data as Record<string, any>[];
          this.fillListSelect();
          if (this.scheduleObj)
            this.scheduleObj.refreshLayout();
        }
        else {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'error',
            iconColor: '#E16F26',
            title: 'Oops...Something went wrong!',
          })
        }
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

  public getHeaderStyles(): Record<string, any> {
    return { 'align-items': 'center', color: '#919191' };
  }

  public getHeaderTitle(): string {
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
    this.searchWord = "";
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor')
      args.cancel = true;
    this.listRecipesBySearch = null;
    this.searchWord = "";
    this.newRecipe = new Recipe()
    this.newRecipe.SchedulingStatuse = 1;
    this.newRecipe.Count = 1;
    this.newRecipe.Date = new Date(args.data.startTime);
  }

  public buttonClickActions(e: Event): void {
    if ((e.target as HTMLElement).id === 'save') {
      if (!this.newRecipe.Date) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          iconColor: '#E16F26',
          title: 'Date is required!',
          showConfirmButton: false,
          timer: 3000
        })
      }
      if (!this.newRecipe.RecipeTitle) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          iconColor: '#E16F26',
          title: 'You must select a recipe to add!',
          showConfirmButton: false,
          timer: 3000
        })
      }
      else {
        this.newRecipe.Date = this.newRecipe.Date ? this.newRecipe.Date : new Date();
        this.newRecipe.SchedulingStatuse = this.newRecipe.SchedulingStatuse ? this.newRecipe.SchedulingStatuse : 1;
        this.recipeService.AddRecipe(this.newRecipe).subscribe(
          (response: any) => {
            if (response.Status) {
              this.getOriginalData();
              this.scheduleObj.refreshTemplates();
            }
            else {
              const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'error',
                iconColor: '#E16F26',
                title: 'Oops...Something went wrong!',
              })
            }
          })
        this.newRecipe = new Recipe();
        this.scheduleObj.closeQuickInfoPopup();
      }
    }
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
    if (this.savedRecipesService.savedRecipes?.filter(x => x.Id === id)[0])
      return true;
    return false;
  }

  public handleRemove(id: string) {
    Swal.fire({
      title: 'Are you sure you want to remove this recipe from Favorites?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancal'
    }).then((result) => {
      if (result.value) {
        this.savedRecipesService.RemoveSavedRecipe(id).subscribe(
          (res: any) => {
            if (res.Status) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Delete successfully.',
                icon: 'success',
                iconColor: '#E16F26',
                timer: 3000,
                showConfirmButton: false
              })
              this.savedRecipesService.numSaved--;
              this.savedRecipesService.savedRecipes.splice(this.savedRecipesService.savedRecipes.findIndex(x => x.Id === id), 1)
            }
            else {
              console.log(res.Error)
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'error',
                iconColor: '#E16F26',
                title: 'Oops...Something went wrong!',
              })
            }
          })
      }
    })
  }

  public handleAdd(id: string) {
    this.recipeService.GetRecipeById(id).subscribe(
      (response: any) => {
        if (response.Status) {
          this.savedRecipesService.AddToSavedRecipes(response.Data).subscribe(
            (res: any) => {
              if (res.Status) {
                this.savedRecipesService.numSaved++;
                this.savedRecipesService.savedRecipes.push(res.Data);
                Swal.fire({
                  title: 'Success!',
                  text: res.Data.Title + " was successfully added.",
                  icon: 'success',
                  iconColor: '#E16F26',
                  timer: 3000,
                  showConfirmButton: false
                })
              }
              else
                alert(res.Error)
            })
        }
        else
          alert(response.Error);
      })

  }

  public delete(id?: number) {
    var l = this.listRecipes.filter(x => x.Code == id)[0] as Record<string, any>;
    let deleteStatus;
    this.deleteOptions = 1; //delete recipe
    if (l.SchedulingStatuse != 1)
      if (l.RecipeDate === l.Date)
        this.deleteOptions = 2; //delete this recipe or entire series
      else
        this.deleteOptions = 3; //delete this recipe, following recipes or entire series
    let optionsInDelete: SweetAlertOptions = {
      icon: 'warning',
      iconColor: '#E16F26',
      showCancelButton: true,
      confirmButtonColor: '#E16F26',
      denyButtonColor: '#6e7881',
      confirmButtonText: 'Delete Recipe',
      showCloseButton: true,
    };
    switch (this.deleteOptions) {
      case 1:
        optionsInDelete.title = 'Are you sure you want to delete this event?'
        optionsInDelete.showCancelButton = false
        break;
      case 2:
        optionsInDelete.title = 'How would you like to change the recipe in the series?'
        optionsInDelete.cancelButtonText = 'Entire Series'
        break;
      case 3:
        optionsInDelete.title = 'How would you like to change the recipe in the series?'
        optionsInDelete.cancelButtonText = 'Entire Series'
        optionsInDelete.showDenyButton = true
        optionsInDelete.denyButtonText = 'Following Recipes'
        break;
    }
    Swal.fire(optionsInDelete).then((result) => {
      if (result.isConfirmed) {
        deleteStatus = 1;
      }
      else if (result.dismiss === Swal.DismissReason.cancel)
        deleteStatus = 2
      else if (result.isDenied)
        deleteStatus = 3;
      if (deleteStatus) {
        this.schedulesService.RemoveSchedules(id, deleteStatus).subscribe(
          (response: any) => {
            if (response.Status) {
              this.getOriginalData();
              Swal.fire({
                title: 'Deleted!',
                text: l.RecipeTitle + ' was successfully deleted.',
                icon: 'success',
                iconColor: '#E16F26',
                timer: 3000,
                showConfirmButton: false
              })
            }
            else {
              Swal.fire({
                icon: 'error',
                iconColor: '#E16F26',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
            }
          })
      }
    })
  }
}
