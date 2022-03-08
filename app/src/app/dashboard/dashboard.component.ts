import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GraficoModel } from '../Model/grafico.model';
import { RecipesService } from '../services/recipes.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    // animations: [
    //   trigger('carouselAnimation', [
    //     transition('void => *', [
    //       style({ opacity: 0 }),
    //       animate('300ms', style({ opacity: 1 }))
    //     ]),
    //     transition('* => void', [
    //       animate('300ms', style({ opacity: 0 }))
    //     ])
    //   ])
    // ]
})
export class DashboardComponent implements OnInit {

    public grafList: Array<GraficoModel> = [
        { Value: 350, Color: '#498B94', Size: '', Legend: 'Monkeys' },
        { Value: 2000, Color: '#F8C622', Size: '', Legend: 'Giraffes' },
        { Value: 1000, Color: '#747474', Size: '', Legend: 'Lions' },
        { Value: 500, Color: '#EC972D', Size: '', Legend: 'Tigers' },
    ];

    //carousel
    randomList = []
    slideConfig = {
        "slidesToShow": 1,
        "slidesToScroll": 1,
        infinite: true,
        dots: true,
        speed: 400,
        autoplay: true,
        autoplaySpeed: 2000
    };
    constructor(public recipesService: RecipesService) { }

    ngOnInit(): void {
        this.randomList = []
        this.recipesService.GetRandom(9).subscribe(data => {
            console.log(data)
            if (data.Status) {
                data.Data.recipes.forEach(element => {
                    this.randomList.push({
                        img: "https://spoonacular.com/recipeImages/" + element.id + "-636x393.jpg",
                        title: element.title
                    })
                });
            }
            else
                console.log(data.Error)
        })
        console.log(this.randomList)
    }

    slickInit(e) {
        console.log('slick initialized');
    }

    breakpoint(e) {
        console.log('breakpoint');
    }

    afterChange(e) {
        console.log('afterChange');
    }

    beforeChange(e) {
        console.log('beforeChange');
    }
}
