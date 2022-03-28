import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  feedback: Record<string, any> = { 'name': '', 'mail': '', 'message': '' }

  constructor() { }

  ngOnInit(): void {
  }

  send() {
    console.log(this.feedback)
    Swal.fire({
      title: 'Thank you for your feedback🤍',
      icon: 'success',
      iconColor: '#E16F26',
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    })
  }
}
