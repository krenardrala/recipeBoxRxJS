import { fromEvent } from 'rxjs';
import AddRecipe from './AddRecipe';
import DeleteRecipe from './DeleteRecipe';
import Helper from './Helper';
import UpdateRecipe from './UpdateRecipe';

class ListRecipes {
    private addRecipe: HTMLButtonElement;
    private list: HTMLElement;
    private modalClose: NodeListOf<HTMLElement>;
    private addRecipeClass: AddRecipe;
    private deleteRecipe: DeleteRecipe;
    private helper: Helper;
    private updateRecipe: UpdateRecipe;

    constructor() {
        this.addRecipe = document.querySelector('#addRecipe');
        this.list = document.querySelector('.list-group');
        this.modalClose = document.querySelectorAll('.closeModal');
        this.addRecipeClass = new AddRecipe();
        this.deleteRecipe = new DeleteRecipe();
        this.helper = new Helper();
        this.updateRecipe = new UpdateRecipe();

        this.listRecipes();
        this.addEventListeners();
    }

    private addEventListeners = () : void => {
        fromEvent(this.addRecipe, 'click').subscribe(() => this.addRecipeClass.addNewRecipe());
        fromEvent(this.modalClose, 'click').subscribe(() => this.helper.closeModal());
    };

    listRecipes = () : void => {
        this.list.innerText = '';
        let recipes: any = [];
        if (localStorage.getItem('recipes')) {
            recipes = JSON.parse(localStorage.getItem('recipes'));

            recipes.forEach((recipe: any, index: number) => {
                let listItem = `<div><a href="#" data-id="` + index + `" class="list-group-item list-group-item-action">` + recipe.name + `</a><span class="delete" data-id="` + index + `">Delete</span></div>`;
                this.list.insertAdjacentHTML('afterbegin', listItem);
            });
            let listItem = document.querySelectorAll('.list-group-item');
            let deleteItem = document.querySelectorAll('.delete');

            listItem.forEach((item) => {
                fromEvent(item, 'click').subscribe((event) => this.updateRecipe.editRecipe(event));
            });
            deleteItem.forEach((item) => {
                fromEvent(item, 'click').subscribe((event) => this.deleteRecipe.deleteRecipe(event));
            });
        }
    };
}

export default ListRecipes;
