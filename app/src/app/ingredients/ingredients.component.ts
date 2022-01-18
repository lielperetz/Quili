import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { SchedulesService } from '../services/schedules.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  listPro:Array<Product>=new Array<Product>();
  
  constructor(public schedulesService:SchedulesService) { }

  ngOnInit(): void {
    this.schedulesService.GetProductsByRange(new Date(2020, 1, 1, 0, 0, 0), new Date(2023, 1, 1, 0, 0, 0)).subscribe(
      (data:any)=>{if (data.Status)this.listPro=data.Data}
      ,err=>{console.log("err")})
  }

}
