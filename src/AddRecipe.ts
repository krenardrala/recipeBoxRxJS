import ListRecipes from './ListRecipes';

class AddRecipe {
    private recipeName: HTMLInputElement;
    private recipeDescription: HTMLInputElement;
    private listRecipes: ListRecipes;

    constructor() {
        this.recipeName = document.querySelector('.recipe-name');
        this.recipeDescription = document.querySelector('.recipe-description');
    }

    addNewRecipe = () : void => {
        if (this.recipeName.value && this.recipeDescription.value) {
            let recipes: any = [];
            if(localStorage.getItem('recipes')) {
                recipes = JSON.parse(localStorage.getItem('recipes'));
            }
            let recipesObj: any = {
                name: this.recipeName.value,
                description: this.recipeDescription.value
            };

            recipes.push(recipesObj);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            this.recipeName.value = '';
            this.recipeDescription.value = '';
            this.listRecipes = new ListRecipes();
            this.listRecipes.listRecipes();
        }
    };

}

export default AddRecipe;
