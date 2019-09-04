import ListRecipes from './ListRecipes';

class AddRecipe {
    private recipeName: HTMLInputElement;
    private recipeDescription: HTMLInputElement;

    constructor() {
        this.recipeName = document.querySelector('.recipe-name');
        this.recipeDescription = document.querySelector('.recipe-description');
    }

    addNewRecipe = () : void => {
        if (this.recipeName.value && this.recipeDescription.value) {
            const recipes = JSON.parse(localStorage.getItem('recipes'));

            let recipesObj: object = {
                id: recipes ? recipes.length + 1 : 1,
                name: this.recipeName.value,
                description: this.recipeDescription.value
            };

            let listRecipes = new ListRecipes();
            listRecipes.addItem(recipesObj);
            this.recipeName.value = '';
            this.recipeDescription.value = '';
        }
    };

}

export default AddRecipe;
