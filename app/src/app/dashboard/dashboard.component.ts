import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GraficoModel } from '../Model/grafico.model';
import { RecipesService } from '../services/recipes.service';
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
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
    constructor(public recipesService: RecipesService, public titleService: Title) {
        this.titleService.setTitle("Home - Quili");
    }
    
    ngOnInit(): void {
        this.randomList = []
        this.recipesService.GetPopular().subscribe(data => {
            console.log(data)
            if (data.Status) {
                data.Data.forEach(element => {
                    this.randomList.push({
                        img: element.recipes[1].RecipeImage,
                        title: element.recipes[1].RecipeTitle
                    })
                    this.grafList.push({ Value: element.count, Color: '#498B94', Size: '', Legend: element.recipes[1].RecipeImage })
                });
            }
            else
                console.log("Error" + data.Error)
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
