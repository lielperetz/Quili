import { Recipe } from "./Recipe";
import { UnitItem } from "./UnitItem";

export class Product {
    constructor(public Code?: number,
        public RecipeCode?: number,
        public RecipeUniqeCode? : number,
        public ProductName?: string,
        public ProductImage?: string,
        public Amount?: number,
        public Unit?: string,
        public Category?: number,
        public Recipes?:any[],
        public Units?: UnitItem[]
        ) {
         }
        

}