import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  fullWidth: boolean;
  currentPage: string;

  constructor() {
    this.fullWidth = false;
    this.currentPage = "Home"
  }
  setFullWidth() {
    this.fullWidth = true;
  }

  setNormal() {
    this.fullWidth = false;
  }
  setCurrentPage(t:string) {
    this.currentPage = t;
  }
}
