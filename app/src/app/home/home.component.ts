
import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import {
  ScheduleComponent, MonthService, View, CurrentAction, CellClickEventArgs, ResourcesModel, CallbackFunction, PopupOpenEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { closest, isNullOrUndefined, Internationalization, compile } from '@syncfusion/ej2-base';
import { ChangeEventArgs as SwitchEventArgs, SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { MultiSelectComponent, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../classes/Recipe';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { SchedulesService } from '../services/schedules.service';

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
  public searchWord: string = "";
  public listRecipesBySearch: Record<string, any> = [];
  public newRecipe: Recipe;
  public intl: Internationalization = new Internationalization();

  constructor(private recipeService: RecipesService, private schedulesService: SchedulesService) {
    this.schedulesService.GetRecipesByUser(new Date(2020, 1, 1, 0, 0, 0), new Date(2023, 1, 1, 0, 0, 0)).subscribe(
      (response: any) => {
        if (response.Status) {
          this.listRecipes = response.Data as Record<string, any>[];
        }
        else
          alert(response.Error)
      })
  }

  public ngOnInit(): void {
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

  public hasEvent(date: Date): boolean {
    let b: boolean = false
    this.recipesForDay = [];
    this.listRecipes?.forEach((x: any) => {
      if (new Date(x.Date).getFullYear() === date.getFullYear() && new Date(x.Date).getMonth() === date.getMonth() && new Date(x.Date).getDate() === date.getDate()) {
        this.recipesForDay.push(x as Record<string, any>);
        b = true;
      }
    })
    return b;
  }

  public parseDate(dateString: string): Date {
    if (dateString)
      return new Date(dateString);
    return null;
  }

  public searchRecipe(e) {
    this.recipeService.SearchRecipe(e).subscribe(
      (response: any) => {
        if (response.Status) {
          this.listRecipesBySearch = response.Data.results as Record<string, any>[];
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
    this.newRecipe.Date = new Date(this.newRecipe.Date.setDate(this.newRecipe.Date.getDate() + 1));
    this.newRecipe.SchedulingStatuse ? this.newRecipe.SchedulingStatuse : 1;
    this.searchWord = ""
    this.listRecipesBySearch = []
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor')
      args.cancel = true;
    this.listRecipesBySearch = [];
    this.searchWord = "";
    this.newRecipe = new Recipe()
    this.newRecipe.SchedulingStatuse = 1;
    this.newRecipe.Date = new Date(args.data.startTime);
  }

  public buttonClickActions(e: Event): void {
    const quickPopup: HTMLElement = closest(e.target as HTMLElement, '.e-quick-popup-wrapper') as HTMLElement;
    const getSlotData: CallbackFunction = (): Record<string, any> => {
      let cellDetails: CellClickEventArgs = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements());
      if (isNullOrUndefined(cellDetails)) {
        cellDetails = this.scheduleObj.getCellDetails(this.scheduleObj.activeCellsData.element);
      }
      // const subject = ((quickPopup.querySelector('#title') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
      // const notes = ((quickPopup.querySelector('#notes') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
      const addObj: Record<string, any> = {};
      addObj.Id = this.scheduleObj.getEventMaxID();
      addObj.Subject = isNullOrUndefined(this.newRecipe.RecipeTitle) ? 'Add title' : this.newRecipe.RecipeTitle;
      addObj.StartTime = new Date(+cellDetails.startTime);
      addObj.EndTime = new Date(+cellDetails.endTime);
      addObj.IsAllDay = cellDetails.isAllDay;
      addObj.Description = isNullOrUndefined(this.newRecipe.RecipeImage) ? 'Add notes' : this.newRecipe.RecipeImage;
      // addObj.CalendarId = ((quickPopup.querySelector('#eventType') as EJ2Instance).ej2_instances[0] as DropDownListComponent).value;
      return addObj;
    };
    if ((e.target as HTMLElement).id === 'save') {
      const addObj: Record<string, any> = getSlotData();
      // console.log(this.scheduleObj.getCurrentViewDates())
      this.recipeService.AddRecipe(this.newRecipe).subscribe(
        (response: any) => {
          if (response.Status) {
            alert(response.Data + "adding recipe is success")
          }
          else
            alert(response.Error)
        })
      this.newRecipe = new Recipe();
    } else if ((e.target as HTMLElement).id === 'delete') {
      const eventDetails: Record<string, any> = this.scheduleObj.activeEventData.event as Record<string, any>;
      let currentAction: CurrentAction;
      if (eventDetails.RecurrenceRule) {
        currentAction = 'DeleteOccurrence';
      }
      this.scheduleObj.deleteEvent(eventDetails, currentAction);
    } else {
      const isCellPopup: boolean = quickPopup.firstElementChild.classList.contains('e-cell-popup');
      const eventDetails: Record<string, any> = isCellPopup ? getSlotData() :
        this.scheduleObj.activeEventData.event as Record<string, any>;
      let currentAction: CurrentAction = isCellPopup ? 'Add' : 'Save';
      if (eventDetails.RecurrenceRule) {
        currentAction = 'EditOccurrence';
      }
      this.scheduleObj.openEditor(eventDetails, currentAction, true);
    }
    this.scheduleObj.closeQuickInfoPopup();
  }
}
