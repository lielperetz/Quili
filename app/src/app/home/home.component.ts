// import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActionEventArgs, CellClickEventArgs, DragAndDropService, DragEventArgs, EventSettingsModel, MonthService, PopupOpenEventArgs, ScheduleComponent, View } from '@syncfusion/ej2-angular-schedule';
// import { L10n } from '@syncfusion/ej2-base'
// import { RecipesService } from '../services/recipes.service';
// import { SchedulesService } from '../services/schedules.service';
// import { DataManager } from '@syncfusion/ej2-data';
// import { of } from 'rxjs';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Recipe } from '../classes/Recipe';

// L10n.load({
//   'en-US': {
//     'schedule': {
//       'cancelButton': 'Close',
//       'deleteButton': 'Remove',
//       'editEvent': 'Edit Menu',
//       'newEvent': 'Add Recipe',
//       'deleteEvent': 'Delete Recipe',
//       'followingEventsButton': 'Following Menus',
//       'addTitle': 'Add Recipe'
//     }
//   }
// })
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
//   providers: [MonthService, DragAndDropService]
// })
// export class HomeComponent implements OnInit {
//   @ViewChild("scheduleObj")
//   public scheduleObj: ScheduleComponent;
//   public currentView: View = 'Month';
//   public selectedDate: Date = new Date();
//   public dataManager: DataManager = new DataManager()
//   newRecipe: Recipe = new Recipe()


//   constructor(public schedulesService: SchedulesService, public recipesService: RecipesService, private modalService: NgbModal) {
//     of().subscribe({
//       next: (data) => () => {
//         this.dataManager = data;
//         console.log(data);
//       },
//       error: (e) => console.error(e),
//       complete: () => console.info('complete')
//     })
//   }

//   ngOnInit(): void {
//   }
//   closeResult = '';

//   private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return `with: ${reason}`;
//     }
//   }

//   public eventSettings: EventSettingsModel = {
//     dataSource: this.dataManager,
//     editFollowingEvents: true,
//     fields: {
//       id: 'RecipeId',
//       subject: { name: 'RecipeTitle', title: 'Recipe Title', validation: { required: true } },
//       startTime: { name: 'Date', title: 'Date', validation: { required: true } },
//       recurrenceRule: { name: 'SchedulingStatuse', default: 'Never' },
//       description: { name: 'RecipeImage' },
//       // recurrenceID: { name: 'RecurrenceID' },
//       // recurrenceException: { name: 'RecurrenceException' },
//       followingID: 'followingID'
//     }
//   }
//   //שליחת מחרוזת עם עיצוב של כל תא
//   getCellContent(date: Date): string {
//     //   //   this.data.forEach((x: any) => {
//     //   //     var d = x.startTime
//     //   //     if (d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate())
//     //   //       return '<img src="../../favicon.ico" /><div class="caption">Party time</div>';
//     //   //   })
//     return '<div class="caption"></div>';
//   }
//   onClickCell(args: any) {
//     if (args) {
//       this.modalService.open(args, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
//         this.closeResult = `Closed with: ${result}`;
//       }, (reason) => {
//         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//       });
//     }
//   }
//   save() {
//     this.scheduleObj.addEvent(this.newRecipe);
//     debugger
//     if (this.recipesService.isEdit == false) {
//       this.recipesService.AddRecipe(this.newRecipe).subscribe({
//         next: (data) => () => {
//           console.log(data);
//         },
//         error: (e) => console.error(e),
//         complete: () => console.info('complete')
//       })
//       this.newRecipe = new Recipe()
//     }
//     // else {
//     //   this.recipesService.updateCloth(this.newRecipe).subscribe(x => console.log("suc"), err => { alert("error") })
//     // }
//     this.recipesService.isEdit = false
//   }
//   onActionComplete(args: ActionEventArgs) {
//     //   if (args.requestType == 'eventCreated') {
//     //     let o: Object = args.addedRecords
//     //     this.recipesService.AddRecipe(o).subscribe({
//     //       next: (data) => () => {
//     //         console.log(data);
//     //       },
//     //       error: (e) => console.error(e),
//     //       complete: () => console.info('complete')
//     //     })
//     //     alert('event create ' + o)
//     //   }
//   }
//   onActionBegin(args: ActionEventArgs) {
//   }
//   // popupClose (args: PopupCloseEventArgs) {
//   //   console.log(args);
//   // }

//   //    onButtonClick(): void {
//   //     let data: Recipe = {
//   //       RecipeId: '1111',
//   //       RecipeTitle: 'Conference',
//   //       Date: new Date(2018, 1, 12, 9, 0),
//   //       SchedulingStatuse: 1,
//   //       RecipeImage: 'img.jpg'
//   //     };
//   //     this.scheduleObj.addEvent(data);
//   //     // this.recipesService.AddRecipe(data).subscribe(x => console.log("suc"), err => { alert("error") })
//   //     this.addButton.element.setAttribute('disabled','true');
//   // }

//   //קבלת נתונים מבחוץ
//   // private dataManager: DataManager = new DataManager({
//   //   // url: 'https://ej2services.syncfusion.com/production/web-services/api/Schedule',
//   //   adaptor: new ODataV4Adaptor,
//   //   crossDomain: true
//   // });

//   // public data: object[] = [{
//   //   Id: 1,
//   //   RecipeName: 'Pizza',
//   //   StartTime: new Date(2021, 9, 15),
//   //   EndTime: new Date(2021, 9, 15),
//   //   RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;COUNT=5;BYDAY=MO,TH',
//   //   Description: '<img src="../../favicon.ico" /><div class="caption">pizza with tuna</div>'
//   // }];

//   onPopupOpen(args: PopupOpenEventArgs): void {
//     if (args.type === 'Editor' || args.type === 'QuickInfo') {
//       args.cancel = true;
//     }
//     else
//       args.cancel = false
//     //       Editor
//     // EventContainer
//     // QuickInfo
//     // RecurrenceAlert
//     // DeleteAlert
//     // ViewEventInfo
//     // EditEventInfo
//     // ValidationAlert
//     // RecurrenceValidationAlert
//   }

//   //Drag Recipes
//   onDragStart(args: DragEventArgs) {
//     args.navigation = { enable: true, timeDelay: 1000 };
//     args.interval = 1;
//   }
// }
import { Component, ViewEncapsulation, Inject, ViewChild, AfterViewChecked, ElementRef, OnInit } from '@angular/core';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import {
  ScheduleComponent, DragEventArgs, MonthService, View, EventSettingsModel, CurrentAction, CellClickEventArgs, ResourcesModel, EJ2Instance, CallbackFunction
} from '@syncfusion/ej2-angular-schedule';
import { EmitType, addClass, extend, removeClass, closest, remove, isNullOrUndefined, Internationalization, compile } from '@syncfusion/ej2-base';
import { ChangeEventArgs as SwitchEventArgs, SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { MultiSelectComponent, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../classes/Recipe';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { SchedulesService } from '../services/schedules.service';
import { ApiRecipesService } from '../services/api-recipes.service';

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
  @ViewChild('workWeekDaysObj') workWeek: MultiSelectComponent;
  @ViewChild('resouresObj') resources: MultiSelectComponent;
  @ViewChild('eventTypeObj') eventTypeObj: DropDownListComponent;
  // @ViewChild('titleObj') titleObj: TextBoxComponent;
  // @ViewChild('notesObj') notesObj: TextBoxComponent;
  @ViewChild('viewSwitch') viewSwitch: SwitchComponent;
  // @ViewChild('groupSwitch') groupSwitch: SwitchComponent;
  @ViewChild('gridlinesSwitch') gridlinesSwitch: SwitchComponent;
  @ViewChild('rowHeightSwitch') rowHeightSwitch: SwitchComponent;
  @ViewChild('tooltipSwitch') tooltipSwitch: SwitchComponent;
  @ViewChild('dragSwitch') dragSwitch: SwitchComponent;
  @ViewChild('dialogTemplate') template: DialogComponent;
  @ViewChild('container', { read: ElementRef }) container: ElementRef;

  public newRecipe: Recipe = new Recipe()
  public searchWord: string = ""
  public listRecipes: Record<string, any>[] = []

  public showFileList = false;
  public multiple = false;
  public buttons: Record<string, any> = { browse: this.importTemplateFn({ text: 'Import' })[0] as HTMLElement };
  public intl: Internationalization = new Internationalization();
  public currentView: View = 'Month';
  public liveTimeUpdate: string = new Date().toLocaleTimeString('en-US', { timeZone: 'UTC' });
  // public group: GroupModel = { resources: ['Calendars'] };
  public resourceDataSource: Record<string, any>[] = [
    { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
    { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
    { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
    { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
  ];
  // public resourceQuery: Query = new Query().where('CalendarId', 'equal', 1);
  public allowMultiple = true;
  public isTimelineView = false;
  public calendarsValue: number[] = [1];
  // public fields: Record<string, any> = { text: 'text', value: 'value' };
  public calendarFields: Record<string, any> = { text: 'CalendarText', value: 'CalendarId' };
  public targetElement: HTMLElement;
  public height: string = '250px';
  // @ViewChild('menuObj') public menuObj: ContextMenuComponent;
  // public selectedTarget: Element;
  // public menuItems: MenuItemModel[] = [
  //   { text: 'New Recipe', iconCss: 'e-icons e-plus', id: 'Add' },
  //   { text: 'New Recurring Recipe', iconCss: 'e-icons e-repeat', id: 'AddRecurrence' },
  //   { text: 'Today', iconCss: 'e-icons e-timeline-today', id: 'Today' },
  //   { text: 'Edit Menu', iconCss: 'e-icons e-edit', id: 'Save' },
  //   {
  //     text: 'Edit Menu', id: 'EditRecurrenceEvent', iconCss: 'e-icons e-edit',
  //     items: [
  //       { text: 'Edit Occurrence', id: 'EditOccurrence' },
  //       { text: 'Edit Series', id: 'EditSeries' }
  //     ]
  //   },
  //   { text: 'Delete Recipe', iconCss: 'e-icons e-trash', id: 'Delete' },
  //   {
  //     text: 'Delete Recipe', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons e-trash',
  //     items: [
  //       { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
  //       { text: 'Delete Series', id: 'DeleteSeries' }
  //     ]
  //   }
  // ];

  public currentRecipe: Record<string, any>;

  constructor(private recipeService: RecipesService, private schedulesService: SchedulesService, private apiRecipe: ApiRecipesService) {
    this.schedulesService.GetRecipesByUser(new Date(2020, 1, 1, 0, 0, 0), new Date(2023, 1, 1, 0, 0, 0)).subscribe(
      (response: any) => {
        if (response.Status) {
          this.listRecipes = response.Data as Record<string, any>[];
        }
        else
          alert(response.Error)
      })
  }

  ngOnInit(): void {
  }

  public b: boolean = true;
  public hasRecipe(date: Date): boolean {
    this.currentRecipe = this.listRecipes.find((x) => {
      let d: Date = new Date(x.Date);
      d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate()
    })
    console.log(this.currentRecipe)
    if (this.currentRecipe)
      return true;
    return false;
  }
  public getCellContent(date: Date): string {
    let index = this.listRecipes.findIndex((x) =>
      new Date(x.Date).getFullYear() === date.getFullYear() && new Date(x.Date).getMonth() === date.getMonth() && new Date(x.Date).getDate() === date.getDate()
    )

    if (index != -1) {
      console.log(index + "index")
      this.currentRecipe = this.listRecipes[index] as Record<string, any>
      return `<div><img src="${this.currentRecipe.RecipeImage}"/></div>`;

    }
    else
      this.currentRecipe = {}
    // console.log(this.currentRecipe.RecipeTitle)
    // let d:Date = new Date((this.listRecipes[1] as Record<string,any>).Date)
    // let i:string = (this.listRecipes[1] as Record<string,any>).RecipeImage
    // console.log(d + " " + i)
    // if (date.getFullYear() === d.getFullYear() && date.getMonth() === d.getMonth() && date.getDate() === d.getDate()) {
    // }
    return "";
  }
  public eventSettings: EventSettingsModel = {
    dataSource: this.listRecipes,
    // dataSource: this.listRecipes,
    // fields: {
    //   id: 'RecipeId',
    //   subject: { name: 'RecipeTitle', title: 'Recipe Title', validation: { required: true } },
    //   startTime: { name: 'Date', title: 'Date', validation: { required: true } },
    //   recurrenceRule: { name: 'SchedulingStatuse', default: 'Never' },
    //   description: { name: 'RecipeImage' },
    //   // recurrenceID: { name: 'RecurrenceID' },
    //   // recurrenceException: { name: 'RecurrenceException' },
    //   // followingID: 'followingID'
    // }
  };

  public onOpenDialog = function (event: any): void {
    // Call the show method to open the Dialog
    this.template.show();
  }

  public importTemplateFn(data: Record<string, any>): NodeList {
    const template: string = '<div class="e-template-btn"><span class="e-btn-icon e-icons e-upload-1 e-icon-left"></span>${text}</div>';
    return compile(template.trim())(data) as NodeList;
  }

  public generateEvents(): Record<string, any>[] {
    debugger
    const eventData: Record<string, any>[] = [];
    this.listRecipes?.forEach(item => {
      eventData.push({
        Id: item.RecipeId,
        Subject: item.RecipeTitle,
        StartTime: item.Date,
        IsAllDay: true,
        // Image: item.RecipeImage,
        // Recurrence: item.SchedulingStatuse
      })
    });
    // const eventSubjects: string[] = [
    //   'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
    //   'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadliest Catch', 'Sports Day', 'MoonShiners',
    //   'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice', 'Rugby Match', 'Guitar Class',
    //   'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
    // ];
    // const weekDate: Date = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()));
    // let startDate: Date = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 10, 0);
    // let endDate: Date = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 11, 30);
    // eventData.push({
    //   Id: 1,
    //   Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
    //   StartTime: startDate,
    //   EndTime: endDate,
    //   Location: '',
    //   Description: 'Event Scheduled',
    //   RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=10;',
    //   IsAllDay: false,
    //   IsReadonly: false,
    //   CalendarId: 1
    // });
    // for (let a = 0, id = 2; a < 500; a++) {
    //   const month: number = Math.floor(Math.random() * (11 - 0 + 1) + 0);
    //   const date: number = Math.floor(Math.random() * (28 - 1 + 1) + 1);
    //   const hour: number = Math.floor(Math.random() * (23 - 0 + 1) + 0);
    //   const minutes: number = Math.floor(Math.random() * (59 - 0 + 1) + 0);
    //   const start: Date = new Date(new Date().getFullYear(), month, date, hour, minutes, 0);
    //   const end: Date = new Date(start.getTime());
    //   end.setHours(end.getHours() + 2);
    //   startDate = new Date(start.getTime());
    //   endDate = new Date(end.getTime());
    //   eventData.push({
    //     Id: id,
    //     // Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
    //     StartTime: startDate,
    //     EndTime: endDate,
    //     Location: '',
    //     Description: 'Event Scheduled',
    //     IsAllDay: id % 10 === 0,
    //     IsReadonly: endDate < new Date(),
    //     CalendarId: (a % 4) + 1
    //   });
    //   id++;
    // }
    // if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    //   Timezone.prototype.offset = (date: Date, zone: string): number => moment.tz.zone(zone).utcOffset(date.getTime());
    // }
    // const overviewEvents: { [key: string]: Date }[] = extend([], eventData, null, true) as { [key: string]: Date }[];
    // const timezone: Timezone = new Timezone();
    // const utcTimezone: never = 'UTC' as never;
    // const currentTimezone: never = timezone.getLocalTimezoneName() as never;
    // for (const event of overviewEvents) {
    //   event.StartTime = timezone.convert(event.StartTime, utcTimezone, currentTimezone);
    //   event.EndTime = timezone.convert(event.EndTime, utcTimezone, currentTimezone);
    // }
    return eventData;
  }

  private getEventData(): Record<string, any> {
    const date: Date = this.scheduleObj.selectedDate;
    return {
      Id: this.scheduleObj.getEventMaxID(),
      Subject: '',
      StartTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours(), 0, 0),
      EndTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours() + 1, 0, 0),
      Location: '',
      Description: '',
      IsAllDay: false,
      CalendarId: 1
    };
  }
  public getDateHeaderText(value: Date): string {
    return this.intl.formatDate(value, { skeleton: 'Ed' });
  }

  public getResourceData(data: Record<string, any>): Record<string, any> {
    const resources: ResourcesModel = this.scheduleObj.getResourceCollections()[0];
    const resourceData: Record<string, any> = (resources.dataSource as Record<string, any>[]).filter((resource: Record<string, any>) =>
      resource.CalendarId === data.CalendarId)[0] as Record<string, any>;
    return resourceData;
  }

  public getHeaderStyles(data: Record<string, any>): Record<string, any> {
    if (data.elementType === 'cell') {
      return { 'align-items': 'center', color: '#919191' };
    } else {
      const resourceData: Record<string, any> = this.getResourceData(data);
      let calendarColor = '#3f51b5';
      if (resourceData) {
        calendarColor = (resourceData.CalendarColor).toString();
      }
      return { background: calendarColor, color: '#FFFFFF' };
    }
  }

  public getEditorHeaderStyles(data: Record<string, any>): Record<string, any> {
    if (data.elementType === 'cell') {
      return { 'align-items': 'left', color: '#919191' };
    } else {
      const resourceData: Record<string, any> = this.getResourceData(data);
      let calendarColor = '#3f51b5';
      if (resourceData) {
        calendarColor = (resourceData.CalendarColor).toString();
      }
      return { background: calendarColor, color: '#FFFFFF' };
    }
  }
  public getHeaderTitle(data: Record<string, any>): string {
    return (data.elementType === 'cell') ? 'Add Recipe' : 'Recipe Details';
  }

  public getEditorHeaderTitle(data: Record<string, any>): string {
    return (data.elementType === 'cell') ? 'New Menu' : 'Edit Menu';
  }

  public getHeaderDetails(data: { [key: string]: Date }): string {
    return this.intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' })
  }

  public getEventType(data: { [key: string]: string }): string {
    const resourceData: Record<string, any> = this.getResourceData(data);
    let calendarText = '';
    if (resourceData) {
      calendarText = resourceData.CalendarText.toString();
    }
    return calendarText;
  }

  public buttonClickActions(e: Event): void {
    debugger
    const quickPopup: HTMLElement = closest(e.target as HTMLElement, '.e-quick-popup-wrapper') as HTMLElement;
    const getSlotData: CallbackFunction = (): Record<string, any> => {
      let cellDetails: CellClickEventArgs = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements());
      if (isNullOrUndefined(cellDetails)) {
        cellDetails = this.scheduleObj.getCellDetails(this.scheduleObj.activeCellsData.element);
      }
      const subject = ((quickPopup.querySelector('#title') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
      const notes = ((quickPopup.querySelector('#notes') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
      const addObj: Record<string, any> = {};
      addObj.Id = this.scheduleObj.getEventMaxID();
      addObj.Subject = isNullOrUndefined(subject) ? 'Add title' : subject;
      addObj.StartTime = new Date(+cellDetails.startTime);
      addObj.EndTime = new Date(+cellDetails.endTime);
      addObj.IsAllDay = cellDetails.isAllDay;
      addObj.Description = isNullOrUndefined(notes) ? 'Add notes' : notes;
      addObj.CalendarId = ((quickPopup.querySelector('#eventType') as EJ2Instance).ej2_instances[0] as DropDownListComponent).value;
      return addObj;
    };
    if ((e.target as HTMLElement).id === 'save') {
      const addObj: Record<string, any> = getSlotData();
      this.scheduleObj.addEvent(addObj);
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

  //Drag Recipes
  onDragStart(args: DragEventArgs) {
    args.navigation = { enable: true, timeDelay: 1000 };
    args.interval = 1;
  }
  public listRecipesBySearch: Record<string, any> = []
  searchRecipe(e) {
    this.apiRecipe.SearchRecipe(e).subscribe({
      next: (data) => () => {
        console.log(data);
        this.listRecipesBySearch = data as Record<string, any>
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }
}
