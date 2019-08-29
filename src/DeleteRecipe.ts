import ListRecipes from './ListRecipes';

class DeleteRecipe {
    private listRecipes: ListRecipes;

    constructor() {
    }

    deleteRecipe = (event: Event) : void => {
        this.listRecipes = new ListRecipes();
        const { target } = event;
        const id: any = (<HTMLInputElement>target).getAttribute('data-id');
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        const newRecipesList = recipes.filter((recipe: any, index: string) => {
            return index != id ? recipe : null;
        });

        localStorage.setItem('recipes', JSON.stringify(newRecipesList));

        this.listRecipes.listRecipes();
    };
}

export default DeleteRecipe;
