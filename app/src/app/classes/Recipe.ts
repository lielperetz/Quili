export class Recipe {
    constructor(
        public RecipeId?: string,
        public RecipeTitle?: string,
        public RecipeImage?: string,
        public Date?: Date,
        public SchedulingStatuse?: number,
        public Count?: number
    ) { }
}