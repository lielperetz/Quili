import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import {
  ScheduleComponent, MonthService, View, PopupOpenEventArgs, PopupCloseEventArgs, addYears, ActionEventArgs, SelectEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { closest, Internationalization } from '@syncfusion/ej2-base';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../classes/Recipe';
import { SchedulesService } from '../services/schedules.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

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
  public numberRecipesForDay: number;
  public searchWord: string = "";
  public listRecipesBySearch: Record<string, any>;
  public newRecipe: Recipe;
  public showOrHidePopup: boolean = false;
  public currentDay: Date;
  public rowAutoHeight: boolean = true;
  public deletePopup: boolean = false;
  public deleteOptions: number;
  public idDeleteRecipe: number;

  constructor(
    private recipeService: RecipesService,
    private schedulesService: SchedulesService,
    public router: Router
  ) {
    this.getOriginalData();
  }

  public ngOnInit(): void {
  }

  async getOriginalData(d1?: Date, d2?: Date): Promise<void> {
    this.schedulesService.GetRecipesByUser(d1 ? d1 : new Date(2021, 0, 1), d2 ? d2 : addYears(new Date(), 1)).subscribe(
      (response: any) => {
        if (response.Status) {
          this.listRecipes = response.Data as Record<string, any>[];
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

  getUrl(id: any) {
    return "url('https://spoonacular.com/recipeImages/'" + id + "'-240x150.jpg')";
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

  public getRecipesForDay(date: Date): Record<string, any>[] {
    this.recipesForDay = [];
    this.numberRecipesForDay = 0;
    this.listRecipes?.forEach((x: any) => {
      if (new Date(x.Date).getFullYear() === date.getFullYear() && new Date(x.Date).getMonth() === date.getMonth() && new Date(x.Date).getDate() === date.getDate()) {
        this.numberRecipesForDay++;
        this.recipesForDay.push(x as Record<string, any>);
      }
    })
    if (this.numberRecipesForDay != 0)
      return this.recipesForDay;
    return null;
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
          // if (response.Status && response.Data.results.length != 0) {
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

  public onPopupClose(args: PopupCloseEventArgs): void {
    this.searchWord = "";
  }

  public onCloseClick(): void {
    this.scheduleObj.quickPopup.quickPopupHide();
  }

  public styleMorePopup = {
    left: '',
    top: '',
    position: 'absolute',
    zIndex: 2
  }
  public showRecipesPopup(date?: Date, e?: any) {
    this.styleMorePopup.left = e.x.toString() + 'px';
    this.styleMorePopup.top = e.y.toString() + 'px';
    console.log((document.querySelector('.e-more-popup-wrapper') as HTMLElement).style);
    if (date)
      this.currentDay = date;
    this.showOrHidePopup = true;
    this.scheduleObj.closeQuickInfoPopup()
  }

  public hideRecipesPopup() {
    this.showOrHidePopup = false;
  }

  public buttonClickActions(e: Event, id?: number): void {
    // const quickPopup: HTMLElement = closest(e.target as HTMLElement, '.e-quick-popup-wrapper') as HTMLElement;
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
            alert(response.Error + "        home save recipe         ")
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

    //   const eventDetails: Record<string, any> = this.scheduleObj.activeEventData.event as Record<string, any>;
    //   let currentAction: CurrentAction;
    //   if (eventDetails.RecurrenceRule) {
    //     currentAction = 'DeleteOccurrence';
    //   }
    //   this.scheduleObj.deleteEvent(eventDetails, currentAction);
    // } else {
    //   const isCellPopup: boolean = quickPopup.firstElementChild.classList.contains('e-cell-popup');
    //   const eventDetails: Record<string, any> = isCellPopup ? getSlotData() :
    //     this.scheduleObj.activeEventData.event as Record<string, any>;
    //   let currentAction: CurrentAction = isCellPopup ? 'Add' : 'Save';
    //   if (eventDetails.RecurrenceRule) {
    //     currentAction = 'EditOccurrence';
    //   }
    //   this.scheduleObj.openEditor(eventDetails, currentAction, true);
    this.scheduleObj.closeQuickInfoPopup();
  }

  public onSelect(args: SelectEventArgs) {
    if (args.requestType === 'cellSelect') {
      let date1: Date = (args.data as Record<string, any>).StartTime as Date;
      let date2: Date = (args.data as Record<string, any>).EndTime as Date;
      this.router.navigate(['site/ingredients/' + formatDate(date1, 'yyyy-MM-dd', 'en-US') + '/' + formatDate(date2, 'yyyy-MM-dd', 'en-US')])
    }
  }

  // public dragRecipe(event: any) {
  //   console.log(event);
  // }

  // public dropRecipe(event: any) {
  //   console.log(event + " drop");
  // }

  // public edit(id?:number){
  //   console.log(id + " edit")
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
    this.idDeleteRecipe = id;
  }
}
