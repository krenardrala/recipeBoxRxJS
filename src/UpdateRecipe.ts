import ListRecipes from './ListRecipes';
import Helper from './Helper';
import {fromEvent} from "rxjs";

class UpdateRecipe {
    private listRecipes: ListRecipes;
    private modal: HTMLElement;
    private modalTitle: HTMLElement;
    private modalDescription: HTMLElement;
    private helper: Helper;

    constructor() {
        this.modal = document.querySelector('#exampleModalLong');
        this.modalTitle = document.querySelector('#exampleModalLongTitle');
        this.modalDescription = document.querySelector('#modalDescription');
        this.helper = new Helper();
    }

    editRecipe = (event: Event) : void => {
        const { target } = event;
        const id: any = (<HTMLInputElement>target).getAttribute('data-id');
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        const editButton = document.querySelector('.edit-recipe');
        const currentRecipe = recipes.find((recipe: any, index: string) => {
            return index == id ? recipe : null;
        });

        fromEvent(editButton, 'click').subscribe(() => this.helper.updateRecipeView(id, currentRecipe));

        this.modalTitle.innerText = currentRecipe.name;
        this.modalDescription.innerText = currentRecipe.description;
        this.modal.classList.add('show');
        this.modal.style.display = 'block';
        document.body.classList.add('modal-open');
        document.body.insertAdjacentHTML('beforeend',`<div class="modal-backdrop fade show"></div>`);
    };


    saveRecipe = (id: number) : void => {
        this.listRecipes = new ListRecipes();
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        const recipeName: HTMLInputElement = document.querySelector('.recipe-name-edit');
        const recipeDescription: HTMLInputElement = document.querySelector('.recipe-description-edit');
        const modalEditBody = document.querySelector('.modal-edit');

        recipes[id].name = recipeName.value;
        recipes[id].description = recipeDescription.value;

        this.modalDescription.style.display = "block";
        modalEditBody.classList.add('hidden');
        document.querySelector('.save-recipe').classList.add('hidden');
        document.querySelector('.edit-recipe').classList.remove('hidden');

        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.helper.closeModal();
        this.listRecipes.listRecipes();
    };
}

export default UpdateRecipe;
