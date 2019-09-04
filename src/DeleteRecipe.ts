import ListRecipes from './ListRecipes';

class DeleteRecipe {

    constructor() {
    }

    deleteRecipe = (event: Event) : void => {
        const { target } = event;
        const id: string = (<HTMLInputElement>target).getAttribute('data-id');
        const listRecipes = new ListRecipes();
        listRecipes.deleteItem(id);
    };
}

export default DeleteRecipe;
