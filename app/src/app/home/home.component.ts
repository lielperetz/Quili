
import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import {
  ScheduleComponent, MonthService, View, CurrentAction, CellClickEventArgs, CallbackFunction, PopupOpenEventArgs, addDays, MoreEventsClickArgs
} from '@syncfusion/ej2-angular-schedule';
import { closest, isNullOrUndefined, Internationalization } from '@syncfusion/ej2-base';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../classes/Recipe';
import { SchedulesService } from '../services/schedules.service';
import { formatDate } from '@angular/common';

/**
 * Sample for overview
 */
@Component({
  // tslint:disable-next-line:component-selector
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
  public intl: Internationalization = new Internationalization();
  public showOrHidePopup: boolean = false;
  public currentDay: Date;

  constructor(private recipeService: RecipesService, private schedulesService: SchedulesService) {
    this.getOriginalData();
  }

  public ngOnInit(): void {
    
  }

 async   getOriginalData() {
    console.log("getOriginalData")
    this.schedulesService.GetRecipesByUser(new Date(2021, 11, 1, 0, 0, 0), new Date(2022, 2, 1, 0, 0, 0)).subscribe(
      (response: any) => {
        if (response.Status) {
          this.listRecipes = response.Data as Record<string, any>[];
        }
        else
          alert(response.Error)
      })
  }

  public getDateHeaderText(value: Date): string {
    return this.intl.formatDate(value, { skeleton: 'Ed' });
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

  public searchRecipe(e) {
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

  public chooseRecipe(id: string) {
    let chosenRecipe = this.listRecipesBySearch?.find((x: any) => x.id === id) as Record<string, any>;
    this.newRecipe.RecipeId = chosenRecipe.id;
    this.newRecipe.RecipeTitle = chosenRecipe.title;
    this.newRecipe.RecipeImage = chosenRecipe.image;
    // this.newRecipe.RecipeId = '654429';
    // this.newRecipe.RecipeTitle = 'Pan Seared Apple Almond Cake';
    // this.newRecipe.RecipeImage = 'https://spoonacular.com/recipeImages/654429-312x231.jpg';
    this.searchWord = "";
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

  public showRecipesPopup(date?: Date) {
    if (date)
      this.currentDay = date;
    this.showOrHidePopup = true;
    this.scheduleObj.closeQuickInfoPopup()

  }

  public hideRecipesPopup() {
    this.showOrHidePopup = false;
  }

  public buttonClickActions(e: Event, id?:number): void {
    const quickPopup: HTMLElement = closest(e.target as HTMLElement, '.e-quick-popup-wrapper') as HTMLElement;
    // const getSlotData: CallbackFunction = (): Record<string, any> => {
    //   let cellDetails: CellClickEventArgs = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements());
    //   if (isNullOrUndefined(cellDetails)) {
    //     cellDetails = this.scheduleObj.getCellDetails(this.scheduleObj.activeCellsData.element);
    //   }
    //   // const subject = ((quickPopup.querySelector('#title') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
    //   // const notes = ((quickPopup.querySelector('#notes') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
    //   const addObj: Record<string, any> = {};
    //   addObj.Id = this.scheduleObj.getEventMaxID();
    //   addObj.Subject = isNullOrUndefined(this.newRecipe.RecipeTitle) ? 'Add title' : this.newRecipe.RecipeTitle;
    //   addObj.StartTime = new Date(+cellDetails.startTime);
    //   addObj.EndTime = new Date(+cellDetails.endTime);
    //   addObj.IsAllDay = cellDetails.isAllDay;
    //   addObj.Description = isNullOrUndefined(this.newRecipe.RecipeImage) ? 'Add notes' : this.newRecipe.RecipeImage;
    //   // addObj.CalendarId = ((quickPopup.querySelector('#eventType') as EJ2Instance).ej2_instances[0] as DropDownListComponent).value;
    //   return addObj;
    // };
    console.log(e + " " + id)

    if ((e.target as HTMLElement).id === 'save') {
      // const addObj: Record<string, any> = getSlotData();
      this.newRecipe.Date = this.newRecipe.Date ? addDays(this.newRecipe.Date, 1) : new Date();
      this.newRecipe.SchedulingStatuse = this.newRecipe.SchedulingStatuse ? this.newRecipe.SchedulingStatuse : 1;
      this.recipeService.AddRecipe(this.newRecipe).subscribe(
        (response: any) => {
          if (response.Status) {
           // alert(response.Data + "adding recipe is success")
            this.getOriginalData();
            this.scheduleObj.refreshTemplates();
          }
          else
            alert(response.Error)
        })
      this.newRecipe = new Recipe();
      // } else if ((e.target as HTMLElement).id === 'delete') {
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
    }
    this.scheduleObj.closeQuickInfoPopup();
  }

  public edit(id?:number){
    console.log(id + " edit")
  }

  public delete(id?:number){
    alert(id + " delete")
  }
}
