import { fromEvent } from 'rxjs';
import { throttleTime, map, scan, find } from 'rxjs/operators';

class Recipe {
    private addRecipe: HTMLButtonElement;
    private list: HTMLElement;
    private recipeName: HTMLInputElement;
    private recipeDescription: HTMLInputElement;
    private modal: HTMLElement;
    private modalTitle: HTMLElement;
    private modalDescription: HTMLElement;
    private modalClose: NodeListOf<HTMLElement>;

    constructor() {
        this.addRecipe = document.querySelector('#addRecipe');
        this.list = document.querySelector('.list-group');
        this.recipeName = document.querySelector('.recipe-name');
        this.recipeDescription = document.querySelector('.recipe-description');
        this.modal = document.querySelector('#exampleModalLong');
        this.modalTitle = document.querySelector('#exampleModalLongTitle');
        this.modalDescription = document.querySelector('#modalDescription');
        this.modalClose = document.querySelectorAll('.closeModal');

        this.listRecipes();
        this.addEventListeners();
    }

    private addEventListeners = () : void => {
        fromEvent(this.addRecipe, 'click').subscribe(() => this.addNewRecipe());
        fromEvent(this.modalClose, 'click').subscribe(() => this.closeModal());
    };

    private addNewRecipe = () : void => {
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
        this.listRecipes();
    };

    private listRecipes = () : void => {
        // Read item:
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
                fromEvent(item, 'click').subscribe((event) => this.deleteRecipe(event));
            });
    }
    }

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
        console.log(id, currentRecipe);
        const saveButton = document.querySelector('.save-recipe');
        document.querySelector('.edit-recipe').classList.add('hidden');
        saveButton.classList.remove('hidden');
        //fromEvent(saveButton, 'click').subscribe(() => this.saveRecipe(id, currentRecipe));

        const modalBody =  document.querySelector('.modal-body');
        const recipeTitleInput = `<input type="text" aria-label="name" class="form-control recipe-name-edit" value="`+ currentRecipe.name +`">`;
        const recipeDescriptionInput = `<input type="text" aria-label="name" class="form-control recipe-description-edit" value="`+ currentRecipe.description +`">`;
        modalBody.removeChild(document.querySelector('#modalDescription'));
        modalBody.insertAdjacentHTML('beforeend', recipeTitleInput);
        modalBody.insertAdjacentHTML('beforeend', recipeDescriptionInput);

    };

    saveRecipe = (id: number, currentRecipe: any) : void => {
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        const recipeName: HTMLInputElement = document.querySelector('.recipe-name-edit');
        const recipeDescription: HTMLInputElement = document.querySelector('.recipe-description-edit');
        debugger
        recipes.forEach((recipe: any, index: number)=> {
            if(index === id) {
                recipe.name = recipeName;
                recipe.description = recipeDescription;
            }
        })

        //localStorage.removeItem('recipes');
        localStorage.setItem('recipes', recipes);
        this.listRecipes();
        this.closeModal();


    };

    deleteRecipe = (event: Event) : void => {
        const { target } = event;
        const id: any = (<HTMLInputElement>target).getAttribute('data-id');
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        const newRecipesList = recipes.filter((recipe: any, index: string) => {
            return index != id ? recipe : null;
        });

        localStorage.setItem('recipes', JSON.stringify(newRecipesList));

        this.listRecipes();

    };

    private closeModal = () : void => {
        const backDrop: HTMLElement = document.querySelector('.modal-backdrop');
        this.modal.classList.remove('show');
        this.modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.removeChild(backDrop);
    }

}

export default Recipe;
