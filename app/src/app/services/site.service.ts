import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

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
  errorAlert(response:string){
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
        title: response,
      })
  }
  
}
