import { fromEvent } from 'rxjs';
import AddRecipe from './AddRecipe';
import DeleteRecipe from './DeleteRecipe';

class ListRecipes {
    private addRecipe: HTMLButtonElement;
    private list: HTMLElement;
    private modal: HTMLElement;
    private modalTitle: HTMLElement;
    private modalDescription: HTMLElement;
    private modalClose: NodeListOf<HTMLElement>;
    private addRecipeClass: AddRecipe;
    private deleteRecipe: DeleteRecipe;

    constructor() {
        this.addRecipe = document.querySelector('#addRecipe');
        this.list = document.querySelector('.list-group');
        this.modal = document.querySelector('#exampleModalLong');
        this.modalTitle = document.querySelector('#exampleModalLongTitle');
        this.modalDescription = document.querySelector('#modalDescription');
        this.modalClose = document.querySelectorAll('.closeModal');
        this.addRecipeClass = new AddRecipe();
        this.deleteRecipe = new DeleteRecipe();

        this.listRecipes();
        this.addEventListeners();
    }

    private addEventListeners = () : void => {
        fromEvent(this.addRecipe, 'click').subscribe(() => this.addRecipeClass.addNewRecipe());
        fromEvent(this.modalClose, 'click').subscribe(() => this.closeModal());
    };

    listRecipes = () : void => {
        this.list.innerText = '';
        let recipes: any = [];
        if (localStorage.getItem('recipes')) {
            recipes = JSON.parse(localStorage.getItem('recipes'));

            recipes.forEach((recipe: any, index: number) => {
                let listItem = `<div><a href="#" data-id="` + index + `" class="list-group-item list-group-item-action">` + recipe.name + `</a><span class="delete" data-id="` + index + `">Delete</span></div>`;
                this.list.insertAdjacentHTML('afterbegin', listItem);
            })
            let listItem = document.querySelectorAll('.list-group-item');
            let deleteItem = document.querySelectorAll('.delete');

            listItem.forEach((item) => {
                fromEvent(item, 'click').subscribe((event) => this.editRecipe(event));
            });
            deleteItem.forEach((item) => {
                fromEvent(item, 'click').subscribe((event) => this.deleteRecipe.deleteRecipe(event));
            });
        }
    };

    editRecipe = (event: Event) : void => {
        const { target } = event;
        const id: any = (<HTMLInputElement>target).getAttribute('data-id');
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        const editButton = document.querySelector('.edit-recipe');
        const currentRecipe = recipes.find((recipe: any, index: string) => {
            return index == id ? recipe : null;
        });

        fromEvent(editButton, 'click').subscribe(() => this.updateRecipeView(id, currentRecipe));

        this.modalTitle.innerText = currentRecipe.name;
        this.modalDescription.innerText = currentRecipe.description;
        this.modal.classList.add('show');
        this.modal.style.display = 'block';
        document.body.classList.add('modal-open');
        document.body.insertAdjacentHTML('beforeend',`<div class="modal-backdrop fade show"></div>`);
    };

    updateRecipeView = (id: number, currentRecipe: any) : void => {
        const saveButton = document.querySelector('.save-recipe');
        document.querySelector('.edit-recipe').classList.add('hidden');
        saveButton.classList.remove('hidden');
        fromEvent(saveButton, 'click').subscribe(() => this.saveRecipe(id));

        const modalEditBody = document.querySelector('.modal-edit');
        modalEditBody.classList.remove('hidden');
        const nameInput : HTMLInputElement = document.querySelector('.recipe-name-edit');
        const descriptionInput : HTMLInputElement = document.querySelector('.recipe-description-edit');
        nameInput.value = currentRecipe.name;
        descriptionInput.value = currentRecipe.description;
        this.modalDescription.style.display = "none";

    };

    saveRecipe = (id: number) : void => {
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
        this.closeModal();
        this.listRecipes();
    };

    private closeModal = () : void => {
        const modalEditBody = document.querySelector('.modal-edit');
        this.modalDescription.style.display = "block";
        modalEditBody.classList.add('hidden');
        document.querySelector('.save-recipe').classList.add('hidden');
        document.querySelector('.edit-recipe').classList.remove('hidden');
        const backDrop: HTMLElement = document.querySelector('.modal-backdrop');
        this.modal.classList.remove('show');
        this.modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.removeChild(backDrop);
    }

}

export default ListRecipes;
