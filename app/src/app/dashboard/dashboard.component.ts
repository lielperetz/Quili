import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Title } from "@angular/platform-browser";
import { SiteService } from '../services/site.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    img = ["../../../assets/images/l_img1.jpg", "../../../assets/images/l_img2.jpg"]
    slideConfig = {
        "slidesToShow": 1,
        "slidesToScroll": 1,
        infinite: true,
        dots: false,
        arrows: false,
        speed: 400,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        cssEase: 'linear'
    };
    popList = []
    popSlideConfig = {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 8000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }
    constructor(public recipesService: RecipesService, public titleService: Title, private siteService: SiteService) {
        this.titleService.setTitle("Home - Quili");
        siteService.setFullWidth();
        this.siteService.setCurrentPage("Home");
    }

    ngOnInit(): void {
        this.popList = []
        this.recipesService.GetPopular().subscribe(data => {
            console.log(data)
            if (data.Status) {
                data.Data.forEach(element => {
                    if (this.popList.length < 10) {
                        this.popList.push({
                            img: element.recipes[0].RecipeImage,
                            title: element.recipes[0].RecipeTitle,
                            code: element.recipes[0].RecipeId
                        })
                    }
                });
            }
            else
                console.log("Error")
        })
    }
}
