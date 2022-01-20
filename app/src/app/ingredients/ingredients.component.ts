import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../classes/product';
import { SchedulesService } from '../services/schedules.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  listPro:Array<Product>=new Array<Product>()

  startDate:Date=new Date(Date.now())
  endDate:Date=new Date(Date.now())

  constructor(public schedulesService:SchedulesService,public activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x=>
      {
        if(x["startDate"])
          this.startDate=x["startDate"]
        if(x["endDate"])
          this.endDate=x["endDate"]    
      })
    this.logPage()
  }
  logPage(){
    console.log("log")
    this.schedulesService.GetProductsByRange(this.startDate,this.endDate).subscribe(
      (data:any)=>{
        if (data.Status)
          this.listPro=data.Data},
     (err)=>{console.log("err")})
  }

}
