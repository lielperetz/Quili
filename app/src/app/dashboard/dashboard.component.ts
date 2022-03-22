import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GraficoModel } from '../Model/grafico.model';
import { RecipesService } from '../services/recipes.service';
import { Title } from "@angular/platform-browser";
import { SiteService } from '../services/site.service';

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
    img = ["../../../assets/images/l_img1.jpg", "../../../assets/images/l_img2.jpg"]
    slideConfig = {
        "slidesToShow": 1,
        "slidesToScroll": 1,
        infinite: true,
        dots: false,
        speed: 400,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        cssEase: 'linear'
    };
    popList = []
    popSlideConfig = {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    constructor(public recipesService: RecipesService, public titleService: Title, private siteService:SiteService) {
        this.titleService.setTitle("Home - Quili");
        siteService.setFullWidth();

    }

    ngOnInit(): void {
        this.popList = []
        this.recipesService.GetPopular().subscribe(data => {
            console.log(data)
            if (data.Status) {
                data.Data.forEach(element => {
                    this.popList.push({
                        img: element.recipes[0].RecipeImage,
                        title: element.recipes[0].RecipeTitle
                    })
                    // this.grafList.push({ Value: element.count, Color: '#498B94', Size: '', Legend: element.recipes[1].RecipeImage })
                });
            }
            else
                console.log("Error" + data.Error)
        })
        console.log(this.popList)
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
