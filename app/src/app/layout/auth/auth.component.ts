import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  imgSrc: string = 'assets/textImg/About1.png';

  constructor() { }

  ngOnInit(): void {
    var images = ['assets/textImg/About1.png', 'assets/textImg/About2.png']
    let i = 1;
    setInterval(() => {
      this.imgSrc = images[i]
      i == 0 ? i = 1 : i = 0;
    }, 5000)
  }

}
