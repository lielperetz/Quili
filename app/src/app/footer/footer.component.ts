import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  name: string;
  email: string;
  message: string;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }

  send() {
    Swal.fire({
      title: 'Thank you for your feedback🤍',
      icon: 'success',
      iconColor: '#E16F26',
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    })
  }

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/xknyvbwo',
        { name: email.name, replyto: email.email, message: email.messages },
        { 'headers': headers }).subscribe(
          (response: any) => {
            if (response.ok) {
              contactForm.reset();
              Swal.fire({
                title: 'Thank you for your feedback🤍',
                icon: 'success',
                iconColor: '#E16F26',
                position: 'center',
                showConfirmButton: false,
                timer: 3000
              })
            }
            else {
              console.log(response)
            }
          }
        );
    }
  }
}
