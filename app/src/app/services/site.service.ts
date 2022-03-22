import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  fullWidth:boolean;
  constructor() {
    this.fullWidth= false;
   }

  setFullWidth() {
    this.fullWidth = true;
  }

  setNormal() {
    this.fullWidth = false;
  }
}
